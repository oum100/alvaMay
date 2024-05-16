// import liff from '@line/liff'
import liff from '@line/liff'

// export default (context:any, inject:any) => {
//     // You can access liff object as this.$liff by inject()
//     inject('liff', liff);
  
//     // execute liff.init()
//     const initResult = liff.init({liffId: '2003108655-0xrnX2Lx'})
//       .then(() => {
//         console.log('liff.init() done');
//       })
//       .catch(error => {
//         console.log(`liff.init() failed: ${error}`);
//         if (!process.env.liffId) {
//           console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
//         }
//         return Promise.reject(error);
//       });
  
//     // You can access liff.init()'s return value (Promise object)
//     // as this.$liffInit() by inject()
//     inject('liffInit', initResult);
//   }


export default defineNuxtPlugin( nuxtApp => {
    // const initResult = liff.init({liffId:'2003108655-0xrnX2Lx'}) // Use own liffId
    // .then(() => {
    //     console.log('liff.init() done');
    //     // console.log(initResult)
    //     // console.log(liff.isLoggedIn());
    //     // console.log(liff.getLanguage());
    //     // console.log(liff.getVersion());
    //     // console.log(liff.isInClient());
    //     // console.log(liff.getOS());
    //     // console.log(liff.getLineVersion());
    //     if (!liff.isLoggedIn()) {
    //         liff.login();
    //     }
    // })
    // .catch((error: any) => {
    //     console.log(`liff.init() failed: ${error}`);
    //     if (!process.env.liffId) {
    //         console.info('LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.');
    //     }
    //     return Promise.reject(error);
    // });
    // return initResult    
})
