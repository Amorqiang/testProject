/** ============== URL 相关的常量-START ============== */
// 1.PC端根据IP定位
export const location = '/commom/ip/location';
// 2.柜员-手机号、邮箱唯一性校验
export const phoneOrEmailValid = '/common/companyOrg/checkEailOrPhone';
// 3.获取图片验证码
export const getImgCode4Register = '/common/companyOrg/getImgCode4Register';
// 4.机构类型
export const companyTypeId = '/common/dictionary/getDictionaryList';
// 5.获取地区
export const queryAllArea = '/common/area/queryAllArea';
// 6.获取国家
export const queryAllCountry = '/common/country/queryAllCountry';
// 7.获取省信息
export const queryAllProvince = '/common/province/queryAllProvince';
// 8.检验机构名称
export const checkCompanyName = '/common/companyOrg/checkCompanyName';
// 9.发送验证码
export const sendCode = '/common/user/sendCode';
// 10.机构用户注册
export const register = '/common/companyOrg/register';
// 11.验证用户名存量
export const findByNameAndPwd = '/common/user/findByNameAndPwd';
// 14.常见问题列表接口、16.消息-政策资讯信息列表、26.公告信息列表查询(接口用type来区分:1.资讯,2.问题,3.公告)
export const selectAllNotice = '/common/knowledge/selectAll';
// 15.消息-客户服务详情、17.消息-政策资讯信息详情、27.公告信息详情查询
export const selectById = '/common/knowledge/selectById';
// 18.业务消息列表
export const msgList = '/owner/message/msgList';
// 19.业务消息列表详情查询
export const msgOne = '/owner/message/msgOne';
// 20.消息状态更改为已读
export const updateState = '/owner/message/updateState';
// 消息-新消息统计
export const msgCountNoRead = '/owner/message/msgCountNoRead';
// 21.消息收藏
export const msgStoreUp = '/owner/message/msgStoreUp';
// 22.取消收藏
export const rmStoreUp = '/owner/message/rmStoreUp';
// 23.首页-成交笔数 成交金额 注册人数
export const getNumberList = '/common/home/getNumberList';
// 24.首页实时成交信息查询
export const findRealTimeTran = '/common/assets/read/findRealTimeTran';
// 25.首页-banner
export const getBanner = '/common/banner/getList';
// 28.首页-LIBOR指数查询
export const dictionarygetNumberList = '/common/dictionary/getNumberList';
// 29.移动端“我的”，返回用户信息
export const mine = '/owner/user/mine';
// 30.我的-企业信息
export const getOrgByUserId = '/owner/companyOrg/getOrgByUserId';
// 31.企业信息补充,34.非银行金融机构信息认证资料补充,35.企业机构信息认证资料补充
export const mackupCompany = '/owner/companyOrg/mackupCompany';
// 32.机构手机号绑定发送验证码
export const sendPhoneCode = '/owner/companyOrg/sendCode';
// 33.机构信息手机号绑定
export const valiCode = '/owner/companyOrg/valiCode';
// 36.添加柜员    (只有管理员可以操作)
export const usreAdd = '/owner/user/saveCompanyUser';
// 37.柜员信息列表查询   (只有管理员可以操作)
export const companyUserList = '/owner/user/findCompanyUserList';
// 38.柜员锁定  (只有管理员可以操作)
export const userLock = '/owner/user/lockCompanyUser';
// 39.柜员注销  (只有管理员可以操作)
export const userCancle = '/owner/user/cancelCompanyUser';
// 40.柜员信息修改
export const userModify = '/owner/user/modifyCompanyUser';
// 41.密码找回-验证码验证接口
export const backPwd = '/common/user/backPwd';
// 42.密码找回-下一步验证验证码
export const validBackPwdCode = '/common/user/validBackPwdCode';
// 43.密码找回-修改密码
export const updatePwd = '/common/user/updatePwd';
// 44.登录状态下修改密码
export const updatePwdById = '/owner/user/updatePwdById';
// 45.待售资产 - 福费廷 移动查询
export const findAssetsForOnsaleList = '/owner/assets/read/findAssetsForOnsaleList';
// 46.市场行情 - 福费廷
export const findMarketAssets = '/common/assets/read/findMarketAssets';
// 47.市场行情 - 保理
export const findMarketFactoring = '/common/factoring/read/findMarketFactoring';
// 48.在售资产 - 福费廷 移动查询
export const findAssetsForSellingList = '/owner/assets/read/findAssetsForSellingList';
// 49.我的资产列表待售资产(PC) - 福费廷和保理
export const findMyAssetsWaitList = '/owner/forfeitingMyAsset/findMyAssetsWaitList';
// 50.我的资产列表在售资产(PC) - 福费廷和保理
export const findMyAssetsNowList = '/owner/forfeitingMyAsset/findMyAssetsNowList';
// 51.详情查询(福费廷) - 卖家 pc 移动,52.详情查询(保理) - 卖家 pc 移动
export const findDetails = '/owner/assetsDetails/read/findDetails';
export const findInfo = '/owner/factoringDetails/read/findDetails';
// 53.待售资产 - 保理 移动查询
export const findFactoringForOnsaleList = '/owner/factoring/read/findFactoringForOnsaleList';
// 54.在售资产 - 保理 移动查询
export const findFactoringForSellingList = '/owner/factoring/read/findFactoringForSellingList';
// 55.买家经办出价
export const insert = '/owner/price/write/insert';
// 56.确认撮合
export const confirmMatch = '/owner/price/write/confirmMatch';
// 57.买家复核通过
export const buyConfirm = '/owner/price/write/buyConfirm';
// 58.买家复核拒绝
export const buyCancel = '/owner/price/write/buyCancel';
// 59.卖家复核确认提交
export const saleConfirm = '/owner/price/write/saleConfirm';
// 60.卖家复核取消
export const saleCancel = '/owner/price/write/saleCancel';
// 61.市场资产报价查询
export const marketPriceRead = '/owner/price/read/marketPriceRead';
// 62.我的资产报价查询  经办
export const ownPricesTransactorRead = '/owner/price/read/ownPricesTransactorRead';
// 63.我的资产报价查询  复核
export const ownPricesRecheckRead = '/owner/price/read/ownPricesRecheckRead';
// 64.我的资产偏好
// 福费廷我的偏好录入
export const assetsBuyingInsert = '/owner/assetsBuying/write/insert';
// 保理我的偏好录入
export const factoringBuying = '/owner/factoringBuying/write/insert';
// 福费廷 我的偏好 修改
export const assetsBuyingupdate = '/owner/assetsBuying/write/update';
// 保理 我的偏好 修改
export const factoringBuyingupdate = '/owner/factoringBuying/write/update';
// 福费廷 我的偏好 详情
export const assetsBuyingDetail = '/owner/assetsBuying/read/assetsBuyingDetail';
// 保理 我的偏好 详情
export const factoringBuyingDetail = '/owner/factoringBuying/read/factoringBuyingDetail';
// 福费廷 我的偏好 列表,保理 我的偏好 列表(assetsType资产类型:1 福费廷  2 保理)
export const myBuyingList = '/owner/assetsBuying/read/myBuyingList';
// 福费廷 我的偏好 删除
export const assetsBuyingDelete = '/owner/assetsBuying/write/delete';
// 保理 我的偏好 删除
export const factoryingBuyingDelete = '/owner/factoringBuying/write/delete';
// 65.我的报价 保理列表,我的报价 福费廷列表(assetsType资产类型: 1福费廷 2保理)
export const myOfferAssets = '/owner/assets/my/myOfferAssets';
// 66.我的积分
export const selectIntegralDetail = '/owner/integralRead/selectIntegralDetail';
// 67.福费廷资产录入
export const forfeitingInsert = '/owner/assets/write/insert';
// 68.福费廷资产详情查询用于经办修改
export const forfeitingDetail = '/owner/assets/read/detail';
// 69.福费廷资产更新接口
export const forfeitingUpdate = '/owner/assets/write/update';
// 70.福费廷资产发布接口
export const forfeitingPublish = '/owner/assets/write/publish';
// 71.福费廷资产删除接口
export const forfeitingDelete = '/owner/assets/write/delete';
// 72.资产录入福费廷 复核岗审核通过、驳回、取消
export const forfeitingAssetsReview = '/owner/assets/write/assetsReview';
// 73.福费廷资产再次发布接口
export const forfeitingRepublish = '/owner/assets/write/republish';
// 74.福费廷资产提交接口
export const forfeitingCommit = '/owner/assets/write/commit';
// 75.福费廷资产卖家确认接口
export const forfeitingConfirm = '/owner/assets/write/sale/confirm';
// 76.福费廷资产卖家要约函发送接口
export const SendDocAndConfirm = '/owner/assets/write/sendDocAndConfirm';
// 77.福费廷资产-查看要约函接口
export const findByAssetsId = '/owner/pollicita/read/findByAssetsId';
// 78.福费廷资产-下载要约函接口
export const downloadTransactorRead = '/owner/pollicita/read/downloadTransactorRead';
// 79.福费廷资产买家确认接口
export const assetsBuyConfirm = '/owner/assets/write/buy/confirm';
// 80.福费廷资产卖家取消接口
export const assetsSaleCancel = '/owner/assets/write/sale/cancel';
// 81.福费廷资产买家取消接口
export const assetsBuyCancel = '/owner/assets/write/buy/cancel';
// 82.保理资产录入接口
export const factoryingInsert = '/owner/factorying/write/insert';
// 83.保理资产更新接口
export const factoryingUpdate = '/owner/factorying/write/update';
// 84.保理资产发布接口
export const factoryingPublish = '/owner/factorying/write/publish';
// 85.保理资产提交接口
export const factoryingCommit = '/owner/factorying/write/commit';
// 86.保理资产删除接口
export const factoryingDelete = '/owner/factorying/write/delete';
// 87.保理资产审核通过、驳回、取消—复核员权限
export const factoryingAssetsReview = '/owner/factorying/write/assetsReview';
// 88.保理查询详情信息接口
export const selectUpdateData = '/owner/factoring/read/selectUpdateData';
// 89.保理查询附件信息接口
export const findBussAttachmentById = '/owner/factoring/read/findBussAttachmentById';
// 90.保理资产卖家确认接口
export const factoryingSaleConfirm = '/owner/factorying/write/sale/confirm';
// 91.保理资产买家确认接口
export const factoryingBuyConfirm = '/owner/factorying/write/buy/confirm';
// 92.保理资产卖家取消接口
export const factoryingSaleCancel = '/owner/factorying/write/sale/cancel';
// 93.保理资产买家取消接口
export const factoryingBuyCancel = '/owner/factorying/write/buy/cancel';
// 94.福费廷、保理资产复核驳回意见查询
export const findAdvise = '/owner/assets/read/findAdvise';
// 95.查询地区、国家联动信息（安卓端定制）
export const areaCountry4App = '/common/area/areaCountry4App';
// 登录
export const Login = '/common/user/login';
// 99.区块链资产查询(单条)
export const queryAssetById = '/owner/blockChain/queryAssetById';
// 98.区块链资产查询(多条)
export const queryAssetsById = '/owner/blockChain/queryAssetsById';
// 101.区块链柜员查询
export const selectStuffById = 'owner/blockChain/selectStuffById';
// 100.区块链机构查询
export const selectAgencyById = '/owner/blockChain/selectAgencyById';
// 101.区块链柜员查询-batch
export const selectStuffsById = '/owner/blockChain/selectStuffsById';
// 详情查询(保理) - 卖家 pc 移动
export const findFactoringDetails = '/owner/factoringDetails/read/findDetails';
// 102.用户登出
export const logout = '/owner/user/logout';
// 103.区块链资产是否上链查询
export const isBlockChainByAssetIds = '/owner/blockChain/isBlockChainByAssetIds';
// 104.判断是否有资产录入权限
export const isEntryAuth = '/owner/companyOrg/isEntryAuth';

/** ============== URL 相关的常量-END ============== */

/** ============== URL 公共服务接口-START ============== */
export const upLoadFile = '/upload/file';
export const ocrFileUpload = '/ocr/upload/file';
/** ============== URL 公共服务接口-END ============== */
// 买家经办出价修改
export const offerUpdate = '/owner/price/write/offerUpdate';
