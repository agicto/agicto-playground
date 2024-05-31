/* This example requires Tailwind CSS v2.0+ */
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { sampleSize } from 'lodash'

const list = [
  '给猫起一个可爱的名字吧～',
  '帮我想一款美容产品的slogan～',
  '帮我策划一次周末活动行吧～',
  '帮我写一篇小红书文案吧～',
  '关于旅游景区的打卡文案～',
  '翻译一下Hello World，并且描述一下应用场景～',
  '为我的公司制定有效的网络安全战略',
  '为患有关节炎的老年患者提出一个治疗计划',
  '去西藏旅行需要注意什么？',
  '冬天手脚冰凉怎么改善？',
  '如何写好年终工作总结？',
  '有哪些好用的思维导图软件？',
  '推荐一款打印机，能打印照片，预算1000~2000',
  '适合冬季带孩子一起进行的户外运动有哪些？',
  '如何评价韩愈的《马说》？',
  '有什么值得长期坚持的好习惯？',
  '推荐三首令人惊艳的古诗词？',
  '什么叫降维打击？',
  '讲一下黑暗森林法则。',
  '你对男性保养有什么经验和建议？',
  '推荐三本经济学入门书籍',
  '简单介绍一下人类简史',
  '考研复试应该从什么时候开始准备？怎么准备？',
  '请介绍一下画家达芬奇。',
  '高效能人士的七个习惯是什么？',
  '《小王子》这本书的读书笔记',
  '如何打领带？',
  '简历应该怎么写？',
  '怎么做减脂餐？',
  '给一个姓王的女孩儿起五个好听的中文名字',
  '推荐一些爵士风格的世界名曲。',
  '写一篇针对大学生的可再生能源发电趋势的文章',
  '写一个介绍西游记的视频脚本',
  '给产品经理的一些建议',
  '前端面试常见的问题',
  '巴西足球为什么这么厉害',
  '一根香蕉的热量是？',
  '我需要关于如何在逆境中保持积极性的指导',
  '为2人设计一份素食食谱，每份含有500卡路里的热量',
  '如何快速增肌？',
  '怎样获得更好的睡眠',
  '什么是BMI指数？',
  '为玩具店写一个标语',
  '抗衰老最有效的方法是什么？',
  '用直白的语言解释一下量子计算',
  '比较一下iOS和Android的优缺点',
  '人力资源的基础是什么？',
  '销售一部手机的文案',
  '为西游记写一个番外故事',
  '推荐一些商务软件视频的背景音乐',
  '帮大学老师写一篇新学期开学演讲稿',
]

function Empty({ onItemClick }) {
  const randomList = useMemo(() => {
    // 执行一些计算操作
    return sampleSize(list, 3)
  }, [])
  const router = useRouter()
  return (
    <div className="w-full md:w-3/5 m-auto  mt-10 md:mt-20">
      <h2 className="text-2xl font-bold text-gray-900">开始提问吧～</h2>
      <p className="mt-1 text-md text-gray-500">
        如果大模型没有满足您的需求, 请联系客服
      
        。
      </p>
      <ul role="list" className="mt-6 border-t border-b border-gray-200 py-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {randomList.map((item, itemIdx) => (
          <li
            key={itemIdx}
            onClick={() => onItemClick && onItemClick(item)}
            className="flow-root p-2 rounded cursor-pointer bg-[#f7f7f8]  "
          >
            <span className="relative -m-2 p-2 flex items-center space-x-4 rounded-xl hover:bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-500">
              <span className="mt-1 text-md font-bold text-gray-900 ">{item}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Empty
