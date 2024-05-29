export default [
    {
  
      title: "Dashboard",
      to:"/dashboard",
      icon:"space_dashboard",
      separator: false,
      children:[]
    },
    {
      title: "Partners",
      to: "/partners",
      icon:"store",
      separator:false,
      children:[]
    },
    {
      title: "Shops",
      to: "/shops/0",
      icon:"store",
      separator:false,
      children:[]
    },
    {
      title: "Transactions",
      icon:"list",
      separator:false,
      children:[
        {
          title:"Sales",
          icon:"paid",
          to:"/sales",
          separator:false
        },
        {
          title:"SCB Payment",
          icon:"qr_code",
          to:"/scbPayment",
          separator:false
        },
        {
          title:"SlipOK",
          icon:"receipt",
          to:"/slipok",
          separator:false
        }
      ]
    },  
    {
      title: "Assets",
      to: "/assets/0",
      icon:"memory",
      separator:false,
      children:[]
    },
    {
      title: "Machines",
      to: "/machines",
      icon:"memory",
      separator:false,
      children:[]
    },
    {
      title: "Devices",
      to: "/devices/0",
      icon:"memory",
      separator:false,
      children:[]
    },
    {
      title: "Settings",
      to: "settings",
      icon:"settings",
      separator:false,
      children:[]
    },
    {
      title: "Products",
      to: "/products",
      icon:"memory",
      separator:false,
      children:[]
    },
    {
      title: "Users",
      to: "/users/0",
      icon:"memory",
      separator:false,
      children:[]
    },
    {
      title: "Financial",
      icon:"account_balance",
      children:[
        {
          title:"Wallet",
          icon:"mdi-wallet-outline",
          to:"/wallet",
          separator:false
        },
        {
          title:"Balance",
          icon:"mdi-wallet-outline",
          to:"/balance",
          separator:false
        }]
    },
  ]