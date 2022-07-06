<template>
  <div>
    <div class="login layui-anim layui-anim-up" id="demo">
      <div class="message">登录</div>
      <div id="darkbannerwrap"></div>
      <div class="layui-form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="state">
            <el-select v-model="ruleForm.state" placeholder="请选择用户类型">
              <el-option label="普通用户" value="1"></el-option>
              <el-option label="管理员" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item class="btnCla">
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      ruleForm: {
        name: "",
        state: "",
        pass: "",
      },
      usercook: "",
      admincook: "",
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        pass: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
        ],
        state: [
          { required: true, message: "请选择用户类型", trigger: "change" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // ajax请求
          var { data: ret } = await this.$http.post("login", this.ruleForm); // 信息多  这样解构
          //    console.log(await this.$http.post('login',this.form));  //没结构前 数据太多只要data
          console.log(ret); // 结构之后只有data数据

          if (ret.data.state == 1 && ret.success == 404) {
            this.loginLoading = false;
            return this.$message.error(ret.message);
          } else {
            if (ret.data.state != 1 && ret.success != 200) {
             return false
            }
              this.usercook = ret.data;
              sessionStorage.setItem("logon", this.usercook);
              this.$router.push("/home");
              return this.$message.success("用户登录成功!");
          }

          if (ret.data.state == 2 && ret.success == 404) {
            this.$message.error(ret.message)
            return false;
          } else {
            if (ret.data.state != 2 && ret.success != 200) {
              return false
            }
              this.admincook = ret.data;
              sessionStorage.setItem("admin", this.admincook);
              this.$router.push("/admin");
              return  this.$message.success("管理员登录成功!");
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

  <style scoped >
.login {
  margin: 120px auto 0 auto;
  min-height: 420px;
  max-width: 420px;
  padding: 40px;
  background-color: #ffffff;
  margin-left: auto;
  margin-right: auto;
  border-radius: 4px;
  /* overflow-x: hidden; */
  box-sizing: border-box;
}
.login a.logo {
  display: block;
  height: 58px;
  width: 167px;
  margin: 0 auto 30px auto;
  background-size: 167px 42px;
}
.login .message {
  margin: 10px 0 0 -58px;
  padding: 18px 10px 18px 60px;
  background: #189f92;
  position: relative;
  color: #fff;
  font-size: 16px;
}
.login #darkbannerwrap {
  width: 18px;
  height: 10px;
  margin: 0 0 20px -58px;
  position: relative;
}

.layui-form {
  margin-right: 25px;
}
.el-form-item__label {
  text-align: center;
}
.btnCla {
  margin-right: 40px;
}
</style>
