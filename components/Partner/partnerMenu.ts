export default [
    {
      title: "Dashboard",
      to:"/partner/dashboard",
      icon:"space_dashboard",
      separator: false,
      children:[]
    },
    {
      title: "Transactions",
      to:"/partner/transactions",
      icon:"segment",
      separator: false,
      children:[]
    },    
    {
      title: "Partner",
      to:"/partner/partner",
      icon:"groups",
      separator: false,
      children:[]
    },
    {
      title: "Shops",
      to:"/partner/shops",
      icon:"store",
      separator: false,
      children:[]
    },    
    {
      title: "Assets",
      to:"/partner/assets",
      icon:"dvr",
      separator: false,
      children:[]
    },  
    {
      title: "Devices",
      to:"/partner/devices",
      icon:"memory",
      separator: false,
      children:[]
    },    
    {
      title: "Machines",
      to:"/partner/machines",
      icon:"microwave",
      separator: false,
      children:[]
    },    
    {
      title: "Settings",
      to:"/partner/settings",
      icon:"settings",
      separator: false,
      children:[
        {
          title:"Profile",
          icon:"badge",
          to:"/partner/settings/profile",
          separator:false
        },
        {
          title:"Users",
          icon:"person",
          to:"/partner/settings/user",
          separator:false
        },
      ]
    },
]