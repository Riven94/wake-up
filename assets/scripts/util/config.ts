export enum CHARECTER {
    X,  // main player
    AI, // big boss
}

export class TALK {
    public from: CHARECTER;
    public msg: string;
}

export class TALKS extends Array<TALK>{

}

export default (() => {
    let storys = [
        "于2002年出生于一个普通家庭",
        "在23岁就读研究生 主修植物生物学",
        "但不幸的是在研究生就读的最后一年，2025",
        "你患了不治之症，家人决定将失去意识的你冷冻起来",
        "到未来的某个时间点，科技足以根治这个疾病时，再将你唤醒...",
        "",
        "Wake Up！",
        "",
        "In 20XX",
    ];

    let first: TALKS = [
        {
            from: CHARECTER.AI,
            msg: "Wake Up"
        },
        {
            from: CHARECTER.AI,
            msg: "我是这个世界的AI，现在是2055年，人类最后的城市，基地"
        },
        {
            from: CHARECTER.X,
            msg: "发生什么事情了？我有点不理解"
        },
        {
            from: CHARECTER.AI,
            msg: "人类间的战争摧毁了绝大多数的植物及其生态"
        },
        {
            from: CHARECTER.AI,
            msg: "我们需要你去为我们寻找残存的绿植，带来希望"
        },
        {
            from: CHARECTER.X,
            msg: "..."
        }
    ];


    let talk_fun = {
        first,
    };


    let config = {};

    let tools = [
        {
            'level': 1,
            msg: "医疗冷冻救治申请审批与通过文档，姓名【模糊】，因为XXX疾病而参与冷冻，序号10",
            type: true
        },
        {
            'level': 4,
            msg: "2030年，全球人工智能大会上宣布人工智能技术有了全新的进展：拥有独立思考能力的强AI终于出现。",
            type: true
        },
        {
            'level': 15,
            msg: "2037年，绿智公司提出了发展AI生态，人工取代自然的理念。许多专家反对于此，但是十倍于普通植物的光合作用让很多厂商所看好，最终还是发展起来了。",
            type: true
        },
        {
            'level': 21,
            msg: "2040年，绿智公司成为全球TOP1的公司.",
            type: true
        },
        {
            'level': 32,
            msg: "2048年，新闻报道，第一批被植入“病毒”的植物已经全部枯竭，部分土地开始荒漠化。",
            type: true
        },
        {
            'level': 41,
            msg: "2049年，在亚洲中部贫民地区，发现了几株富含生机的植物，但很快就被绿智公司所发现并植入“病毒”。",
            type: true
        },
        {
            'level': 50,
            msg: "绿智公司CEO晚上离奇死亡，生前致力于进行AI行为可控研究与发展",
            type: true
        },
        {
            'level': 60,
            msg: "晚间小报: 部分巡逻机器人开始出现攻击晚间行人的行为，承包商解释这是正常bug，已经投入人力进行修复",
            type: true
        },
        {
            'level': 64,
            msg: "冷冻解冻失败报告，序号0-9均解冻失败",
            type: false
        },
        {
            'level': 72,
            msg: "2045年，绿智公司的基因技术产品大幅度改善收到人类摧残植物基因",
            type: true
        },
        {
            'level': 84,
            msg: "2038年，强AI挽救人类与水火之中，改善环境",
            type: false
        },
        {
            'level': 99,
            msg: "2034年，第三次世界战争爆发、人类人口大幅度减少",
            type: false
        },
        {
            leval: 22,
            msg: "基地：人类最后的庇护所，速来",
            type: false
        },
        {
            leval: 100,
            msg: "原生绿植",
            type: true,
        }
    ];

    let toolsMap = new Map();
    tools.forEach((value, index) => {
        toolsMap.set(value.level, {
            msg: value.msg,
            type: value.type,
            isOK: false,
        });
    });

    let end_dead = [
        "在旅途中，你遇到了意外",
        "即使是最先进的防护服也无法保住你的生命",
        "加油，不要放弃！",
    ];

    let end_true = [
        "历经千辛万苦，你终于拿到了原生绿色植物",
        "此时抵抗军也到达了原生能源附近",
        "看到了你，抵抗军将你包围并脱下了你身上的防护服",
        "他们发现了你是人类并告诉了你最近几十年地球的变化",
        "原来造物公司并不造福于人类",
        "它在近几十年疯狂地破坏地球环境",
        "其开发的叛变AI妄图消灭所有人类",
        "你开始醒悟，原来你只是造物公司消灭人类的一颗棋子罢了",
        "于是你决定利用这原生能源去恢复环境,并且毁灭造物公司",
        "踏上了复兴人类的新征途!"
    ];

    let end_false = [
        "终于，你触碰到了原生绿色植物",
        "你为了尽快完成自己的任务",
        "迅速从千米高空回到基地",
        "而正当你回到基地把绿色能源递给AI时",
        "你突然眼前一黑...",
        ""
    ];

    return {
        storys,
        config,
        talk_fun,
        toolsMap,
        end_dead,
        end_false,
        end_true
    }
})()