<template>
    <div>
        <textarea ref="editor" v-model="content" rows="20" class="edit-area" @click="selectArea"></textarea>
        <div ref="result" class="result"></div>
    </div>
</template>

<style>
.result {
    width: 1000px;
    height: 200px;
    border: 1px solid #333;
    overflow: auto;
}

.edit-area {
    width: 100%;
    height: 100%;
    background: lightblue;
}

.remove {
    background: pink;
    color: red;
    text-decoration: line-through;
}

.new {
    width: 12px;
    display: inline-block;
    background: lightgreen;
    color: green;
}

.unknown {
    background: yellow;
}
</style>

<script>
export default {
    data() {
        return {
            content: '首先你要坚信，即使是从来没有写过东西的人也一定是可以心怀写作梦想的。（当初写这一句是为了反驳排名第一的答案，里面有句话：从来没有写过东西的人就不要说自己要写作了。还重复了三遍。如今那个答案已删，所以略显突兀，但放在这也好，权当一个激励。热爱写作，终究是一件好事）怎么开始写长篇小说？你可以选择先看一些理论再写，也可以先写再看理论。前面很多朋友说得很好，就是写作新人的第一稿，基本上是很糟糕的，所以不用去思考怎么开出经典著作的第一笔，你怎么开笔，它都难以成为经典。浅谈一下我对小说的理解，不论长短篇，它应该都得具备这三个要素。第一，矛盾。矛盾是所有故事的核心，戏剧张力的来源，也是吸引人的关键。矛盾由渴望与阻碍组成。比如一个故事的开头，主角要过马路，过马路是他的渴望。但是面前这条路坏掉了，正在施工，不准任何人过去。这就是阻碍了。渴望加阻碍，就形成了矛盾。矛盾让读者产生焦虑的心情，读者会不由自主地想，那主角到底该怎么过去呢？第二，行动。有了矛盾，就必须解决矛盾。主角过不去，他就得想办法，比如绕到维修路段之前或者之后，或者有一个天桥或者地下通道可以过去等等。总之主角会采取行动去解决矛盾，这样，故事就展开了。第三，结果。有所行动就肯定有结果。假如主角选择走天桥，那他最后很可能成功到达了对面。行动的结果便是结局。假设主角选择硬闯，很可能会被施工人员拦住。那么这次行动的结果会开启了一个新的矛盾。主角为了解决这个矛盾又得展开新的行动，行动有可能带来更糟糕的结果……于是故事就一直戏剧性的展开下去了。这基本上是一个简易的戏剧模型。了解这一点之后你还需要掌握一些技巧让故事变得好看吸引人，有三点技巧。第一，悬疑。怎么样制造悬疑？拿刚才的例子来说，主角要过马路是读者知道的，主角为什么要过马路如果你不说，读者就不知道，这就是悬疑。比如当主角被施工人员抓住之后还执意要过去，但是又没透露为什么一定要过去，过去是为了干什么，读者就会对马路对面产生好奇。悬疑就是隐藏一部分信息。第二，让矛盾滚雪球。一开始主角只想过马路，行动之后结果被施工人员抓了，这里矛盾已经激化了。如果主角挣脱施工人员的控制，强行过去，行动结果很可能有危险——被车撞，掉进大坑（假如有的话），等等。那么这里的矛盾就更大了。主角很可能已经受伤或者死亡。故事也就到达了高潮。第三，渲染。身为一个讲故事的人，肯定得有情感的渲染能力。主角受伤或者死掉，这里已经到达了高潮，马上就要结局，要揭露悬疑了。你不能简单的说，他只是想过马路对面买支棒棒糖……好吧，可以说是买一支棒棒糖，但必须要让读者接受买支棒棒糖能够付出巨大的代价。怎么办，渲染。这支棒棒糖一定要足够珍贵，什么样的棒棒糖才足够珍贵？随意发挥了，比如我刚看了《功夫》，便觉得可以安排这样一个故事背景：主角跟女朋友吵架，女朋友要跟其分手，女朋友收拾行李要走。主角突然想到追女友时送的那个棒棒糖，企图用曾经的回忆去感动女友。于是主角匆匆下楼，要去马路的便利店买糖。这时候，我们顺便就把之前的很多逻辑给顺清了。为什么放着不远处的天桥与地下通道不走，偏偏要闯过去，因为女友走迫在眉睫，主角分秒必争。为什么被施工人员拦住还要作死冲，那是因为他真的爱女友。这种情感一渲染，爱的主题就表达出来了，悲剧的力量也有了，整个故事也就完成了。当然，时间关系，这推得着实狗血，你可以有无数种选择把故事讲得更好更复杂更有深度。————————————————你问到网络小说与金庸小说的结构区别，其实很好解释。网络小说大多是单一的主角，它当然可以全篇围绕着“一个人过马路的渴望”去写，而金庸的小说大多是多主角的，比如天龙八部，便是三主角，所以它呈现的是“多人过马路”的样子。但无论什么小说，你去细细解构，会发现都只是在过马路。————————————————看到这里，你觉得大纲还重要吗？好吧，对于某些人它确实很重要。但对于一些写作成熟的人而言，并不重要。写小说就像一个弹球游戏，你做好了各种障碍物，捏好了各色质量不一的小球，把它们丢进容器，轻轻一按，球就会弹起来，遇到障碍怎么反弹跟你无关，跟之前设定的质量有关。总而言之，很多好故事，其实都是故事本身演绎而成的。所以金庸写天龙八部的时候，有人问他结局，他说，我自己也不能知道。',
            editor: null,
            result: null,
            shadow: [],
            curPosStatus: 1 // 单字符操作
        }
    },
    watch: {
        content(now, old) {
            if (now.length > old.length) { // 增
                this.addContent(now, old)
            } else { // 删
                this.delContent(now, old)
            }
        }
    },
    created() {
        let len = this.content.length
        this.shadow = Array.from(this.content).map((v, k) => {
            return {
                index: k,
                value: v,
                status: 1 // 1: normal; 0: remove; 2: new; 3: unknown
            }
        })
    },
    mounted() {
        this.editor = this.$refs.editor
        this.result = this.$refs.result
        this.updateResult()
    },
    methods: {
        selectArea() { // 多选
            const curPos = this.getCursorPos(this.editor)
            if (this.result.querySelectorAll('.unknown').length) { // 当前已存在选中项
                // const selectedItem = this.result.querySelectorAll('.unknown')
                for (let item of this.shadow) {
                    if (item.status === 3) {
                        item.status = 1
                    }
                }
                this.updateResult()
            }
            if (curPos.start !== curPos.end) {
                this.curPosStatus = 2
                let index = 0
                for (let item of this.shadow) {
                    if (index >= curPos.start) {
                        if (index === curPos.end) {
                            return this.updateResult()
                        }
                        if (item.status === 1 || item.status === 2) {
                            index++
                        }
                        item.status = 3
                    }
                    if (item.status === 1 || item.status === 2) {
                        index++
                    }
                }
            } else {
                this.curPosStatus = 1
            }
        },
        addContent(now, old) {
        },
        updateResult() { // 更新预览区
            let queue = []
            let curClass = ''
            for (let item of this.shadow) {
                if (item.status === 2) {
                    curClass = ' class="new"'
                } else if (item.status === 0) {
                    curClass = ' class="remove"'
                } else if (item.status === 3) {
                    curClass = ' class="unknown"'
                } else {
                    curClass = ''
                }
                queue.push(`<span${curClass}>${item.value}</span>`)
            }
            this.result.innerHTML = queue.join('')
        },
        delContent(now) {
            if (this.curPosStatus === 1) { // 删除单个
                const curPos = this.getCursorPos(this.editor)
                let index = 0
                for (let item of this.shadow) {
                    if (index === curPos.end) {
                        item.status = 0
                        return this.updateResult()
                    }
                    if (item.status === 1 || item.status === 2) {
                        index++
                    }
                }
            } else { // 删除多个
                for (let item of this.shadow) {
                    if (item.status === 3) {
                        item.status = 0
                    }
                }
                this.updateResult()
            }
        },
        getCursorPos(element) { // 当前光标位
            if (document.selection) {
                element.focus()
                let range = document.selection.createRange()
                let rangelen = range.text.length
                range.moveStart('character', -element.value.length)
                let start = range.text.length - rangelen
                return {
                    start: start,
                    end: start + rangelen
                }
            } else if (element.selectionStart || element.selectionStart === 0) {
                return {
                    start: element.selectionStart,
                    end: element.selectionEnd
                }
            } else {
                return {
                    start: 0,
                    end: 0
                }
            }
        }
    }
}
</script>