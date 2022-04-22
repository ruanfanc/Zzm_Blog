<template>
  <el-form :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
    <el-form-item label="博客标题" prop="name">
      <el-input v-model="BlogMessage.title"></el-input>
    </el-form-item>
    <el-form-item label="博客副标题" prop="name">
      <el-input v-model="BlogMessage.vicetitle"></el-input>
    </el-form-item>

    <span style="font-size: 14px; margin-left: 20px">* 博客分类:</span>
    <el-select v-model="BlogMessage.sort" placeholder="请选择博客分类">
      <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.label"></el-option>
    </el-select>
    <span style="font-size: 14px; margin-left: 100px">* 博客标签:</span>
    <el-select
      v-model="BlogMessage.label"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="请选择文章标签"
    >
      <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.label"></el-option>
    </el-select>
    <!-- 富文本编辑器 -->
    <div style="width: 800px">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="BlogMessage.content"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"
      />
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { createBlog } from "@/api";
export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: "http://152.136.254.142:3000/api/blog/uploadimg",
            fieldName: "file",
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 3 * 1024 * 1024, // 1M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ["image/*"],
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
              token: "xxx",
              otherKey: "yyy",
            },
            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,
            // 跨域是否传递 cookie ，默认为 false
            // 超时时间，默认为 10 秒
            base64LimitSize: 5 * 1024, // 5kb
            timeout: 5 * 1000, // 5 秒
          },
        },
      },
      mode: "default", // or 'simple'
      options1: [
        {
          value: "选项1",
          label: "生活",
        },
        {
          value: "选项2",
          label: "学习",
        },
        {
          value: "选项3",
          label: "技术",
        },
        {
          value: "选项4",
          label: "日志",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "JavaScript",
        },
        {
          value: "选项2",
          label: "Html",
        },
        {
          value: "选项3",
          label: "Css",
        },
        {
          value: "选项4",
          label: "Python",
        },
        {
          value: "选项5",
          label: "Java",
        },
        {
          value: "选项6",
          label: "数据结构",
        },
      ],
      updateUrl: "",
      value1: "",
      BlogMessage: {
        // 博客id
        id: "",
        // 博客主标题
        title: "",
        // 博客副标题
        vicetitle: "",
        // 博客内容
        content: "",
        // 博客发布日期
        date: "2022-03-23 0:12:12",
        // 博客浏览量
        views: 1,
        // 博客点赞量
        likes: 1,
        // 博客分类
        sort: "",
        // 博客标题
        label: "",
      },

      rules: {
        // name: [
        //   { required: true, message: "", trigger: "blur" },
        //   { min: 0, max: 1000, message: "", trigger: "blur" },
        // ],
      },
      ruleForm: {},
    };
  },

  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    submitForm(formName) {
      this.BlogMessage.label = this.BlogMessage.label.toString();
      const date = new Date();
      this.BlogMessage.date = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      createBlog(this.BlogMessage);
    },
  },
  mounted() {},
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy();
  },
};
</script>
<style>
.editor {
  line-height: normal !important;
  height: 300px;
}
.SizeTiShi {
  font-size: 12px;
  color: #999999;
  text-align: right;
  /* margin-right: 20px; */
  margin-top: 60px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px" !important;
  font-size: 14px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="10px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="10px"]::before {
  content: "10px" !important;
  font-size: 10px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="12px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="12px"]::before {
  content: "12px" !important;
  font-size: 12px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px" !important;
  font-size: 16px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px" !important;
  font-size: 18px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px" !important;
  font-size: 20px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="30px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="30px"]::before {
  content: "30px" !important;
  font-size: 30px;
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px" !important;
  font-size: 32px;
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5" !important;
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体" !important;
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimSun"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimSun"]::before {
  content: "宋体" !important;
  font-family: "SimSun";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体" !important;
  font-family: "SimHei";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Microsoft-YaHei"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Microsoft-YaHei"]::before {
  content: "微软雅黑" !important;
  font-family: "Microsoft YaHei";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体" !important;
  font-family: "KaiTi";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋" !important;
  font-family: "FangSong";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial" !important;
  font-family: "Arial";
}

.ql-snow
  .ql-picker.ql-font
  .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow
  .ql-picker.ql-font
  .ql-picker-item[data-value="Times-New-Roman"]::before {
  content: "Times New Roman" !important;
  font-family: "Times New Roman";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
  content: "sans-serif" !important;
  font-family: "sans-serif";
}

.ql-font-SimSun {
  font-family: "SimSun";
}

.ql-font-SimHei {
  font-family: "SimHei";
}

.ql-font-Microsoft-YaHei {
  font-family: "Microsoft YaHei";
}

.ql-font-KaiTi {
  font-family: "KaiTi";
}

.ql-font-FangSong {
  font-family: "FangSong";
}

.ql-font-Arial {
  font-family: "Arial";
}

.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}

.ql-font-sans-serif {
  font-family: "sans-serif";
}
</style>