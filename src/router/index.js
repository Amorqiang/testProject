import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  routes: [
    // 首页，当页面首次进来的时候跳转到的是首页
    {
      path: '/',
      name: 'home',
      redirect: '/index'
    },
    // 主页
    {
      path: '/index',
      name: 'Index',
      component: () => import('../components/index')
    },
    // 用户登录
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/Login')
    },
    // 用户注册
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/Register')
    },
    // 找回密码
    {
      path: '/findpwd',
      name: 'FindPwd',
      component: () => import('../components/FindPwd')
    },
    // 找回密码下一页
    {
      path: '/findpwdnext',
      name: 'FindPwdNext',
      component: () => import('../components/FindPwdnext')
    },
    // 我的页面
    {
      path: '/mine',
      name: 'Mine',
      component: () => import('../components/mine/Mine')
    },
    // 发布首页面
    {
      path: '/saleforfaiting',
      name: 'SaleForfaiting',
      component: () => import('../components/publish/SaleForfaiting')
    },
    // 我的偏好福费廷
    {
      path: '/hobbyforfeiting',
      name: 'HobbyForfaiting',
      component: () => import('../components/publish/HobbyForfeiting')
    },
    // 我的企业信息
    {
      path: '/myCompany',
      name: 'myCompany',
      component: () => import('../components/mine/myCompany')
    },
    // 银行用户企业信息补充页
    {
      path: '/datasupplement',
      name: 'DataSupplement',
      component: () => import('../components/mine/DataSupplement')
    },
    // 非银行金融机构企业信息补充页
    {
      path: '/dataUnbackSupplement',
      name: 'DataUnbackSupplement',
      component: () => import('../components/mine/DataUnbackSupplement')
    },
    // 企业用户信息补充页
    {
      path: '/dataBusinessSupplement',
      name: 'DataBusinessSupplement',
      component: () => import('../components/mine/DataBusinessSupplement')
    },
    // 企业信息完善页
    {
      path: '/companymsg',
      name: 'Companymsg',
      component: () => import('../components/mine/Companymsg')
    },
    // 我的资产
    {
      path: '/myassets',
      name: 'Myassets',
      component: () => import('../components/mine/Myassets')
    },
    {
      path: '/myAssetsDetails/:assetsName/:id',
      name: 'myAssetsDetails',
      component: () => import('../components/mine/myAssetsDetails')
    },
    //  福费廷报价资产详情页
    {
      path: '/ForfeitingDetails/:assetsName/:id',
      name: 'ForfeitingDetails',
      component: () => import('../components/mine/ForfeitingDetails')
    },
    //  保理报价资产详情页
    {
      path: '/FactoringDetails/:assetsName/:id',
      name: 'FactoringDetails',
      component: () => import('../components/mine/FactoringDetails')
    },
    //  我的柜员的页面
    //  {
    //    path:'/admin',
    //    name:'admin',
    //    component:() => import('../components/mine/Admin')
    //  },
    // 我的报价经办福费廷页
    {
      path: '/offerbankrunforfeiting',
      name: 'Offerbankrunforfeiting',
      component: () => import('../components/mine/Offerbankrunforfeiting')
    },
    // 我的偏好福费廷页
    {
      path: '/myhobbyforfeiting',
      name: 'Myhobbyforfeiting',
      component: () => import('../components/mine/Myhobbyforfeiting')
    },
    //  我的偏好福费廷修改页面
    {
      path: '/HobbyForfeitingUpdate',
      name: 'HobbyForfeitingUpdate',
      component: () => import('../components/publish/HobbyforfeitingUpdate')
    },
    // 我的偏好福费廷详情页面
    {
      path: '/HobbyForfeitingDetail',
      name: 'HobbyForfeitingDetail',
      component: () => import('../components/publish/HobbyforfeitingDetail')
    },
    // 我的积分页
    {
      path: '/myscore',
      name: 'Myscore',
      component: () => import('../components/mine/Myscore')
    },
    // 柜员管理页面
    {
      path: '/tellermanage',
      name: 'Tellermanage',
      component: () => import('../components/mine/Tellermanage')
    },
    // 我的消息界面
    {
      path: '/mynews',
      name: 'Mynews',
      component: () => import('../components/mine/Mynews')
    },
    // 重置密码
    {
      path: '/passwordreset',
      name: 'Passwordreset',
      component: () => import('../components/mine/Passwordreset')
    },
    //  买入福费廷页面
    {
      path: '/buyforfeiting',
      name: 'Buyforfeiting',
      component: () => import('../components/market/Buyforfeiting')
    },
    // 买入福费廷详情页面
    {
      path: '/detailforfeiting/:id',
      name: 'Detailforfeiting',
      component: () => import('../components/market/Detailforfeiting')
    },
    // 关于页面
    {
      path: '/aboutplatform',
      name: 'Aboutplatform',
      component: () => import('../components/about/Aboutplatform')
    },
    // 最新资讯页
    {
      path: '/news',
      name: 'News',
      component: () => import('../components/about/News')
    },
    // 资讯详情页
    {
      path: '/newsdetail',
      name: 'Newsdetail',
      component: () => import('../components/about/Newsdetail')
    },
    // 客户服务页面
    {
      path: '/customerservice',
      name: 'Customerservice',
      component: () => import('../components/about/Customerservice')
    },
    // 购买保理界面
    {
      path: '/buyfactoring',
      name: 'Buyfactoring',
      component: () => import('../components/market/Buyfactoring')
    },
    // 我的求购福费廷复核界面
    {
      path: '/offerbankreviewforfeiting',
      name: 'Offerbankreviewforfeiting',
      component: () => import('../components/mine/Offerbankreviewforfeiting')
    },
    // 我的求购保理经办界面
    {
      path: '/offerbankrunfactoring',
      name: 'offerbankrunfactoring',
      component: () => import('../components/mine/Offerbankrunfactoring')
    },
    // 我的求购保理复核界面

    {
      path: '/offerbankreviewfactoring',
      name: 'offerbankreviewfactoring',
      component: () => import('../components/mine/Offerbankreviewfactoring')
    },
    // 我的偏好保理页
    {
      path: '/myhobbyfactoring',
      name: 'myhobbyfactoring',
      component: () => import('../components/mine/Myhobbyfactoring')
    },
    // 我的偏好保理详情页
    {
      path: '/Hobbyfactoringdetail',
      name: 'Hobbyfactoringdetail',
      component: () => import('../components/publish/Hobbyfactoringdetail')
    },
    // 我的偏好保理编辑页
    {
      path: '/Hobbyfactoringupdate',
      name: 'Hobbyfactoringupdate',
      component: () => import('../components/publish/Hobbyfactoringupdate')
    },
    // 我的偏好保理编辑页
    //  {
    //    path:'/Hobbyfactoringupdate',
    //    name:'Hobbyfactoringupdate',
    //    component: () => import('../components/publish/Hobbyfactoringupdate')
    //  },
    // 出售保理录入页
    {
      path: '/salefactoring',
      name: 'salefactoring',
      component: () => import('../components/publish/Salefactoring')
    },
    // 出售保理录入下一页
    {
      path: '/nextsalefactoring',
      name: 'nextsalefactoring',
      component: () => import('../components/publish/Nextsalefactoring')
    },
    // 保理偏好录入页
    {
      path: '/hobbyfactoring',
      name: 'hobbyfactoring',
      component: () => import('../components/publish/Hobbyfactoring')
    },
    // 保理报价买入详情页
    {
      path: '/detailfactoring/:id',
      name: 'detailfactoring',
      component: () => import('../components/market/Detailfactoring')
    },

    // 福费廷详情卖方确认撮合
    {
      path: '/sellerdetailforfeiting/:id',
      name: 'sellerdetailforfeiting',
      component: () => import('../components/market/Sellerdetailforfeiting')
    },
    // 福费廷邀约函
    {
      path: '/invitationLetter/:id',
      name: 'invitationLetter',
      component: () => import('../components/mine/invitationLetter')
    },
    // 福费廷资产区块链
    {
      path: '/forfeitingBlockchain/:id/:act',
      name: 'forfeitingBlockchain',
      component: () => import('../components/blockchain/forfeitingBlockchain')
    },
    // 保理卖家确认撮合
    {
      path: '/sellerdetailfactoring/:id',
      name: 'sellerdetailfactoring',
      component: () => import('../components/market/Sellerdetailfactoring')
    }
  ]
});
export default router;
