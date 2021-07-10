<template>
  <div class="mainBody">
    <div id="login_box">
      <h2>LOGIN</h2>
      <div id="input_box">
        <input v-model="username" type="text" placeholder="请输入用户名">
      </div>
      <div class="input_box">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <button @click="loginAction">
        登录
      </button><br>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogLogin',
  layout: 'full',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    loginAction () {
      this.$store.dispatch('user/login', { password: this.password, username: this.username }).then((res) => {
        if (process.browser) {
          this.$router.push({ path: '/blog' })
          // eslint-disable-next-line no-self-assign
          // window.location.href = window.location.href
        }
      })
    }
  }
}
</script>

<style scoped>

.mainBody {
  background: url('./static/blogBG.png') no-repeat;
  background-size: 100% 120%;
  width: 100%;
  position: absolute;
  height: calc(100vh);
}

#login_box {
  width: 40%;
  height: 400px;
  background-color: #00000060;
  margin: auto;
  margin-top: 10%;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

h2 {
  color: #ffffff90;
  margin-top: 5%;
}

#input-box {
  margin-top: 5%;
}

span {
  color: #fff;
}

input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}

button {
  margin-top: 50px;
  width: 60%;
  height: 30px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}

#sign_up {
  margin-top: 45%;
  margin-left: 60%;
}

a {
  color: #b94648;
}
</style>
