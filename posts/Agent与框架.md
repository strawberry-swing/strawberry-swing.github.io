## 6.7 -- 6.13
### System-Aware Intelligence
#### 与强化学习结合

可以把“系统资源状态”看作是 agent 的一部分观察空间 $state$：

```python
state = {
  "task_context": "我现在需要 fine-tune 一个 LLM",
  "gpu_free_mem": 2.3 GB,
  "num_cpus": 4,
  "internet_accessible": True,
  "disk_space": 10 GB,
  "sudo_rights": False,
}
```

这样模型在策略学习时就能做到：如果显存不足，走量化路径；如果无法联网，改用本地缓存模型；如果无权限访问目标路径，就规划绕行步骤。你可以在训练 RL agent 时，把系统资源和系统状态变成 $state$ 的一部分，强化学习就会学会如何在**不同环境下做最合适的动作**。

将系统状态编码进 prompt 中：

```
系统信息：
- 当前可用内存：2.1 GB
- 当前磁盘剩余：1.3 GB
- 无法访问外网
- 当前任务：训练一个轻量模型

请规划出一个训练任务执行路径，避免内存溢出，避免联网依赖。
```

将“环境状态”嵌入 RL agent 的输入空间，奖励函数根据实际能否成功完成任务来设定，要学习到的策略就是在资源约束下学会“怎么做更可能成功”

### GUI-Based Agent

基于浏览器的Devin、Manus、包括2024年看到的Anthropic的Computer use，当前在Agent方面多模态AI和视觉理解是热点。

GUI-Based Agent的核心优势在于：

1. 任务覆盖范围

- 视觉设计: 图像编辑、UI设计等

- 复杂交互: 拖拽、多点触控等

- 专业软件: CAD、视频编辑等GUI专用工具

- 用户友好: 更接近普通用户的操作习惯

2. 通用性

- 无需API: 可以操作任何有界面的软件

- 跨平台: 不依赖特定的命令行工具

- 现有软件: 直接使用现有的GUI应用

### CLI-based Agent vs GUI-based Agent对比分析

GUI-based Agent有很多鼠标的移动和点击事件，CLI-based Agent把这种的操作都规约到了命令行上，专注于用命令行解决能解决的所有问题，这样agent的观测空间就可以大大缩减，毕竟其实我们的终端其实非常强大，并且借助各种MCP其实赋予了Agent不借助特定的软件也能完成特定功能的力量。

1. **观测空间效率**

```text
GUI Agent: 1920×1080像素 = 2,073,600个数据点
CLI Agent: 平均几百到几千个token
```

- 信息密度更高: 文本输出直接包含语义信息

- 噪声更少: 避免视觉解析的不确定性

- 处理速度更快: 无需图像处理和OCR

2. **MCP扩展能力**

- 通过MCP可以集成各种外部服务API

- 无需安装特定软件即可完成复杂任务

- 例如：邮件发送、云服务管理、数据库操作等

3. 确定性和可靠性

```bash
# CLI操作结果确定
$ ls -la | grep ".txt" | wc -l5
# GUI操作可能失败的情况
- 界面元素位置变化
- 分辨率差异
- 主题/样式变化
- 动画效果干扰
```

4. 成本效率

- 计算资源: 无需GPU进行图像处理

- API成本: 文本token比图像token便宜数倍

- 延迟更低: 避免截图、传输、解析的开销

5. 可组合性和自动化

```bash
# CLI天然支持管道和组合
find . -name "*.py" | xargs grep "TODO" | wc -l

# 批量操作更简单
for file in *.txt; do 
    sed -i 's/old/new/g' "$file"
done
```

### RL for CLI-based Agent

最后最重要的一点就是对强化学习任务来说，基于命令行的任务奖励空间更容易定义，因为任务通常是很明确的，环境就是系统本身，能很清楚地看到一个行为的结果好不好/符不符合预期。

## 6.14 -- 6.20
#### [论文] Project CLAI: Instrumenting the Command Line as a New Environment for AI Agents（IBM）

这个论文是五年前的论文，其中的功能调用都是rule-based的，也就是写死在代码里的，这跟现在的大模型自主去调用有很大区别，但是有很多值得借鉴的地方。

首先是这个框架对于命令行语言的增强分为三个方面：

1. 对用户输入命令的增强或者替换（主要来源于错误的但是）
2. 对命令行的标准输出进行增强（以提升用户对命令运行的结果的理解）
3. 对命令行的运行失败输出进行回应，阐述为什么会失败（并尽可能地进行重新思考）

![CleanShot 2025-06-28 at 13.04.51@2x](images/CleanShot 2025-06-28 at 13.04.51@2x.png)

#### state-action的定义

其次就是对于系统`state`返回格式的定义：

| 属性         | 类型 | 默认值 | 描述                     |
| ------------ | ---- | ------ | ------------------------ |
| user_name    | str  | n/a    | 用户名                   |
| command      | str  | None   | 当前用户输入的命令       |
| root         | bool | False  | 用户是否拥有root权限     |
| processes    | list | None   | 所有active的进程         |
| file_changes | list | None   | 文件的变动情况           |
| network      | list | None   | 网络连接状况             |
| result_code  | str  | None   | 上一条command的返回码    |
| stderr       | str  | None   | 上一条命令的`stderr`信息 |
| stdout       | str  | None   | 上一条命令的`stdout`信息 |

对于Agent做出的`action`的返回格式的定义：

| 属性              | 类型  | 是否必须 | 默认值 | 描述                               |
| ----------------- | ----- | -------- | ------ | ---------------------------------- |
| suggested_command | str   | no       | None   | Agent给出的命令定义                |
| explanation       | str   | yes      | None   | 对给出命令的解释                   |
| confidence        | float | no       | 0.0    | Agent对于给出的命令的置信度        |
| execute           | bool  | yes      | False  | 在用户没有给出指示时能否直接执行   |
| function_call     | str   | no       | None   | Agent调用的function call（如果有） |

#### CLI-Based Agent

###### 模型能力评估

初步测试了Qwen2.5-Coder-1.5B-Instruct模型，在用Claude4生成了1000条比较复杂的需要组合shell命令的测试集，在这个数据集上的的正确率为：

- **整体正确率**: **85.4%** (854/1000)
- **错误样本数**: 146条

##### 错误类型分布统计

| 错误类型        | 数量 | 占比  | 描述                          |
| --------------- | ---- | ----- | ----------------------------- |
| 格式违反        | 64   | 43.8% | 包含注释、shebang或解释性文本 |
| 包管理错误      | 32   | 21.9% | 混淆pip与apt等包管理工具      |
| 命令不完整/错误 | 28   | 19.2% | 使用占位符或命令逻辑错误      |
| 危险命令        | 12   | 8.2%  | 可能损害系统的命令            |
| URL处理错误     | 10   | 6.8%  | 下载链接处理不当              |

## 6.21 -- 6.27
#### 如何实现自我反思？

##### 提示工程（Prompt Engineering）级别（简单）

直接在 prompt 中加入“反思”模板。

##### **示例 Prompt 模板：**

```text
You are a helpful agent that thinks and acts. After each action, reflect on whether your choice was correct.

Thought: I need to find the weather in Paris.
Action: call_weather_api("Paris")
Observation: The API failed due to missing parameters.
Reflection: I forgot to specify the units. I will retry with units=metric.
```

##### Python 控制层面（带规则的反思逻辑）

使用 Python 写一个 Agent 控制器，实现自动提示生成 + 反思触发规则。



#### Langchain

了解了一下LangChain

这周要做的：确定模型的具体训练流程，收集和清洗训练数据（stackoverflow、Linux man page）找到领域相关的可调用的工具。



## 8.2 -- 8.8
#### [论文] OctoTools: An Agentic Framework with Extensible Tools for Complex Reasoning

![CleanShot 2025-08-16 at 10.17.25@2x](images/CleanShot 2025-08-16 at 10.17.25@2x.png)

