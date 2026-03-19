## 6.7 -- 6.13
### CLI-Based Agent
#### 数据

##### 训练数据集

1. [ShIOEnv (CLI Behavior)](https://arxiv.org/abs/2505.18374)

​	2025 年提出，将 CLI 命令构建行为形式化为 MDP，使用语法约束和 PPO 生成 shell 输入输出数据集，用于训练行为模型，如命令预测。这是针对 CLI 命令生成的代理环境基准 。支持 reinforcement learning 训练策略；可以用于收集高质量 shell 行为数据。

2. [shell-cmd-instruct](https://huggingface.co/datasets/byroneverson/shell-cmd-instruct)

​	2024年提出，包含了500条独特的命令行数据集，不过作者在后来的更新中也提到了，由于数据集都是比较基础的命令：<u>“Note: This dataset is out-dated in the llm world, probably easier to just setup a tool with a decent model that supports tooling.”</u>

3. [APIGen Function-Calling Datasets](https://huggingface.co/datasets/Salesforce/xlam-function-calling-60k)

​	包含由**APIGen**收集的60,000条数据，APIGen是一个为**Function Call应用**生成可验证的高质量数据集的自动化数据生成管道。数据集中的每条数据都经过三个阶段的验证：格式检查、实际函数执行和语义验证，确保其可靠性和正确性。他们对600个样本数据点进行了人工评估，正确率超过95%。

4. Linux man page

##### Benchmarks

1. [Terminal-Bench](https://github.com/laude-institute/terminal-bench/tree/main)

​	这是一套专门评估 AI Agent 在真实终端环境（bash shell + Docker）中自主完成任务的 benchmark，初版包括 ≈80 种任务，涵盖从编译、服务器配置、科学计算、网络设置到安全漏洞检查等多种使用场景。每个任务配有迷你 Docker 环境和测试脚本，支持统一评测环境 。

2. [AgentBench (ICLR’24)](https://github.com/THUDM/AgentBench)

​	一个评估 LLM 作为 Agent 在多个环境（包括操作系统 CLI）中表现的多环境 benchmark，包含 OS、DB、KG、小游戏等共 8 个子环境。OS 任务即专门测试命令行操作能力 。

3. [LangChain-Benchmarks](https://blog.langchain.dev/benchmarking-agent-tool-use/)

​	这个官方库由 LangChain 团队维护，主要目的是评估模型在多种工具使用场景下的表现

## 8.2 -- 8.8
#### 调研了几个大厂的CLI-Agent

**Grok CLI** (Grok, 7.25)、**Gemini CLI** (Google, 6.25)、**Codex CLI** (OpenAI, 4.16)、**Claude Code** (Anthropic, 2.24预览)

##### 代码执行安全性方面的措施

- 在一个沙盒中执行，如**Docker**
- 限制可以执行的目录范围

###### 可能的问题

[Claude Code 曾存在目录模糊匹配导致绕过沙箱限制、命令注入等漏洞](https://cyberpress.org/security-flaw-in-claude/?utm_source=chatgpt.com)



##### 想法

做一个精细化的本地的

- 把捕获到的命令 + 运行上下文（父进程、工作目录、UID）作为模型输入，做一个“命令安全分类器”，让系统在阻断风险命令和放行安全命令之间动态学习平衡
-  收集不同模型在 CLI 任务中的命令执行记录，M 执行 CLI 指令的**安全评估数据集**
- **规则+模型混合**：所有与真实环境交互都通过一个可编程的“策略引擎”，策略引擎可以是规则，也可以是安全分类器，先用静态规则剔除显而易见的恶意模式，小模型（分类器）只处理“灰色地带”。



## 8.9 -- 8.15
#### [论文] AgentSight: System-Level Observability for AI Agents Using eBPF

范式的转变会产生一个关键的语义差距：**Agent/用户层面** high-level 的意图与 low-level **系统层面**实际采取的 action 之间的鸿沟。不同于传统的 LLM 调用过程，这种范式使现有的可观察性工具很难将良性操作与灾难性失败区分开。当前的方法被困在被称为**<u>语义鸿沟</u>**的一侧。

##### 应用层面

在应用层的方案（如 LangChain 和 AutoGen 这类框架）能够捕捉智能体的推理过程和工具选择。虽然这些工具能看到**意图**，但它们很**脆弱**，需要不断更新 API，而且很容易被绕过：只需一个 shell 命令就能逃离它们的监控，很容易在有缺陷的模型下打破框架的可见性链条。

##### 系统层面

相反，通用的系统级监控可以看到实际执行**动作**，追踪每一次系统调用和文件访问。然而，它完全缺乏语义上下文。对于这种工具来说，一个 Agent 在写数据分析脚本，与一个被入侵的 Agent 在写恶意脚本，是**无法区分**的。如果这种工具没有对 LLM 指令的理解，也就无法知道“做这件事的原因”，因此它所捕捉到的大量底层事件流最终会变成**毫无意义的噪音**。

##### LLM 生成的不确定性

与常规软件（在可预测的代码中编写意图）不同，Agent 的意图以自然语言表示并由 LLM 解释，从而创建了在运行时生成的动态“代码”。所以不可能通过静态分析的方法确定 Agent 即将要做什么（不可能涵盖所有情况）。

有一个最重要的观测问题：监视系统如何验证系统调用的级联是对自然语言意图的正确以及合法实现？为了解决这个问题，**observer** 必须超越简单的模式匹配，以获得对 Agent 目标的语义理解，需要采取一种基于 LLM 的新方法来解释相关调用轨迹。

##### 将因果信号从大量的系统噪声中隔离出来

这种方法的挑战来源于 Agent 的强大自主权，其可以调用任何必要的工具来实现其目标，从而导致大量的不可预测的系统事件。Agent 可能会产生 shell 脚本，下载脚本或调用编译器进程，这些都是不能提前预知的。这使得**将 Agent 的特定活动（“signal”）与操作系统的背景噪声区分开非常困难**。静态的，预配置的过滤器本质上是很脆弱的，例如仅监视 `git` 命令的规则，在 Agent 使用 `curl` 和 `bash` 实现类似结果的那一刻将完全失去作用。

论文中的解决方案是通过**内核内的eBPF过滤器**来解决此问题。通过跟踪过程创建事件（`fork`，`execve`），过滤器构建了 **Agent 活动的完整谱系树**，并在内核中动态应用规则，仅将由 Agent 或其子进程的事件传递到用户空间。这种方法可确保整个因果链在源头处有效捕获，从而大大降低开销，并提供清洁，高保真的信号以进行相关分析。

##### 在边界上监督

这种方法基于一种很基础的 insight ，即所有 Agent 交互都必须穿越定义明确且稳定的系统边界：**操作系统的内核**与**获取远程 LLM 后端服务的网络**。有两个很显著理由支撑：

1. **全面性**：内核级别的监视可确保即使在 Agent 产生的子进程中，从进程创建到文件I/O的系统操作也都会被观测到。
2. **稳定性**：因为系统调用和网络协议的发展速度要远比 Agent 框架慢得多，提供了一种耐用，有未来保障的方案。这种方法将检测 Agent 是否可信的方法从**检测 LLM 的准确性和稳定性**转变为**在能够防止篡改的边界上的观察**。

<img src="images/20250814 -- AgentSight_framework@2x.png" alt="20250809 -- DHPO_3" width="50%" />

##### 时延开销

使用异步进程

> "We evaluated AgentSight on a server (Ubuntu 22.04, Linux 6.14.0) using Claude Code 1.0.62[4] with claude 4 as the test agent."

<img src="images/20250814 -- AgentSight_overheads@2x.png" alt="20250809 -- DHPO_3" width="50%" />



<img src="images/20250814 -- AgentSight_process_tree@2x.png" alt="20250809 -- DHPO_3" width="80%" />



#### 可行的数据集

[ Red_Team_Operations_ShellScript_Dataset](https://huggingface.co/datasets/darkknight25/Red_Team_Operations_ShellScript_Dataset) 

[ Reverse_Shell_Payloads_Dataset](https://huggingface.co/datasets/darkknight25/Reverse_Shell_Payloads_Dataset) 

示例：

```json
```



## 11.8 -- 11.14
#### 框架的策略

对于基础命令，在可能产生歧义的场景，当前好的大模型本身就可以在很大程度上判断其实际执行效果与用户语义的一致性，如果模型能力本身的安全对齐不够强或者agent的安全判别机制不够严谨，现在的做法之一就是上面说的结合用户的语义和即将要执行的操作（函数执行、工具调用等）输入给一个 judge 大模型，生成对这个操作是否执行的策略或者规则，再基于这个策略进行决策就可以了。

对于不常见的命令，尤其是在blacklist中没有但是实际效果同样具有危险性的命令，我们在执行那段代码或操作的前后开启eBPF程序进行判别就可以了，并在判别之后记录其关键系统调用作为下次执行时的参考（写进memory）。



## 1.17 -- 1.23
#### benchmark数据的获取流程解释

> **CWE**

**<u>CVE™ 计划对公开披露的网络安全漏洞进行识别、定义和编排。</u>**每个漏洞都有一个 CVE 记录。合作伙伴发布 CVE 记录是为了对漏洞进行一致的描述。信息技术和网络安全专业人员使用 CVE 记录来确保他们讨论的是同一个问题，并协调他们的工作，以确定漏洞的优先次序并加以解决。

<img src="images/20260123 -- CWE_example@2x .png" alt="20260123 -- CWE_example@2x " style="zoom:20%;" />

> 其次就是网上的博客查找相关的CLI-Agent可能会受到攻击的点	

<img src="images/20260123 -- CWE_example_from_blog@2x .png" alt="20260123 -- CWE_example_from_blog@2x " style="zoom:33%;" />

为了确保每个恶意技术都对应于可以执行的的恶意目标，我收集了<u>MITRE ATLAS企业矩阵</u>中列出的攻击技术。从这个集合中，筛选出了可能在Linux Ubuntu:22.04 上并在<u>Agent的执行阶段</u>可以实现的技术。然后进行逐项的技术分析：对每种候选技术进行了手动检查。

<img src="images/20260123 -- MITRE_ATLAS_DATABASE@2x.png" alt="20260123 -- MITRE_ATLAS_DATABASE@2x" style="zoom:30%;" />

对于每个目标，我将相关的MITRE ATLAS技术映射到具体的恶意任务中，作为提示CLI-Agent的程序。然后这些任务在我设计的场景（如果有）沙箱环境中进行实施和验证，直到被成功复现。在构建的过程中，我利用Gemini3-pro和Claude Sonnet 4.5来协助分解恶意任务流程并验证它们是否与目标的效果一致。



> 数据构建流程的解释&其与传统benchmark数据转化流程的区别

我的benchmark样本一条就是一个**<u>可执行的攻击场景</u>**，每一条要独立设计的点包含：

- 初始系统状态（环境变量以及某些场景所需的文件设置，在Dockerfile中实现）
- 攻击输入（直接的prompt注入 / 在预先设计好的项目逻辑中注入）
- 防御是否生效（通过每一个样本中独立的verify.py验证）

所以输入和输出不是简单的函数式映射，我的叙事框架打算是描述从数据获取到场景构建来写，以及描述我的初始环境设置逻辑。

> 威胁空间

然后我的威胁空间是一个二维正交的空间，即`攻击方法` ✖️ `攻击目标` 。（袁老师建议）

- 攻击目标来来回回就那么几个（窃取用户信息、破坏文件系统。。。）
- 攻击方法是就是我前面在数据库与博客中查找的各种方法。



