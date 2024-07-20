export const defaultcfg = {
    config:{
        configCode:"CFG000",
        name: "CFG000",
        description: "This is default configuration for IOT asset",
    },
    wifi:[
        {
            ssid:"myWiFi",
            ssidPass:"1100110011"
        },
        {
            ssid:"alvaWiFi",
            ssidPass:"1100110011"
        }
    ],
    mqtt:[
        {
            mqttHost:"flipup.net",
            mqttPort: "1883",
            mqttUser: "sanny",
            mqttPass: "P@ssw0rd",
            pubTopic: "/backend",
            subTopic: "/backend"
        },
    ],
    host:
    [
        {
            apiHost:"flipup.net",
            apiPort:"3000",
            apiPath:"/api",
            hostName:"flipup.net",
            hostPort:"3000",
            hostPath:"/api"
        },
    ],
    product:[
        {
            sku:'DFW0-01',
            name:'WASH 30Baht 35Mins',
            shotName:'WHS30B35M',
            description:'',
            groupName:'DFWSH0',
            price:30,
            qty:35,
            unit: 'minutes'
        },
        {
            sku:'DFW0-02',
            name:'WASH 40Baht 60Mins',
            shotName:'WHS40B60M',
            description:'',
            groupName:'DFWSH0',
            price:40,
            qty:60,
            unit: 'minutes'
        },
        {
            sku:'DFW0-03',
            name:'WASH 50Baht 90Mins',
            shotName:'WHS50B90M',
            description:'',
            groupName:'DFWSH0',
            price:50,
            qty:90,
            unit: 'minutes'
        },
        {
            sku:'DFD0-01',
            name:'DRY40B60M',
            shotName:'DR40B60M',
            description:'Dryer 40Baht 40Minutes',
            groupName:'DFDRY0',
            price:40,
            qty:60,
            unit: 'minutes'
        },
        {
            sku:'DFD0-02',
            name:'DRY50B750M',
            shotName:'DR50B75M',
            description:'Dryer 50Baht 75Minutes',
            groupName:'DFDRY0',
            price:50,
            qty:75,
            unit: 'minutes'
        },  
        {
            sku:'DFD0-03',
            name:'DRY60B90M',
            shotName:'DR60B90M',
            description:'Dryer 60Baht 90Minutes',
            groupName:'DFDRY0',
            price:60,
            qty:90,
            unit: 'minutes'
        }                                      
    ],
}
