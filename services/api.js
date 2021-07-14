/**
 * @author ff
 * @date 2021/4/28
 * @Description:api接口管理
 * @update by:
 */

import myserver from '@/services/getRequest'

const user = {
  registered: {
    url: 'user/registered',
    type: 'post'
  },
  forgot: {
    url: 'user/forgot',
    type: 'post'
  },
  login: {
    url: 'user/login',
    type: 'post'
  },
  getInfo: {
    url: 'user/userinfo',
    type: 'post'
  },
  userList: {
    url: 'user/userList',
    type: 'post'
  },
  logout: {
    url: 'user/logout',
    type: 'post'
  },
  articlesAdd: {
    url: 'articles/add',
    type: 'post'
  },
  articlesSelect: {
    url: 'articles/select',
    type: 'post'
  },
  articlesImg: {
    url: 'articles/uploadimg',
    type: 'post'
  },
  articlesfb: {
    url: 'articles/updataFbzt',
    type: 'post'
  },
  ArticlesUPDATE: {
    url: 'articles/UPDATEArticles',
    type: 'post'
  }

}
myserver.postData('user', user)
export default myserver
