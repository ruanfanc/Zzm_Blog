<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="博客标题" prop="name">
      <el-input v-model="BlogMessage.title"></el-input>
    </el-form-item>
    <el-form-item label="博客副标题" prop="name">
      <el-input v-model="BlogMessage.vicetitle"></el-input>
    </el-form-item>

    <span style="font-size: 14px; margin-left: 20px">* 博客分类:</span>
    <el-select v-model="BlogMessage.sort" placeholder="请选择博客分类">
      <el-option
        v-for="item in options1"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
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
      <el-option
        v-for="item in options2"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>
    <!-- 富文本编辑器 -->
    <div style="width: 800px">
      <quill-editor
        style="margin-top: 20px"
        v-model="BlogMessage.content"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')"
        >立即创建</el-button
      >
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  [{ direction: "rtl" }], // 文本方向
  [{ size: ["10px", "12px", false, "16px", "18px", "20px", "30px", "32px"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [
    {
      font: [
        false,
        "SimSun",
        "SimHei",
        "Microsoft-YaHei",
        "KaiTi",
        "FangSong",
        "Arial",
        "sans-serif",
      ],
    },
  ], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["image"], // 链接、图片、视频
];
import ImageResize from "quill-image-resize-module";
import { ImageDrop } from "quill-image-drop-module";
import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
import { Quill, quillEditor } from "vue-quill-editor";
import { createBlog, uploadimg } from "/src/api";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Quill.register("modules/ImageExtend", ImageExtend);
Quill.register("modules/imageResize", ImageResize);
Quill.register("modules/imageDrop", ImageDrop);
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "16px", "18px", "20px", "30px", "32px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "sans-serif",
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  components: {
    quillEditor,
  },
  data() {
    return {
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
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "...",
        modules: {
          ImageExtend: {
            // 如果不作设置，即{}  则依然开启复制粘贴功能且以base64插入
            name: "file", // 图片参数名
            size: 3, // 可选参数 图片大小，单位为M，1M = 1024kb
            action: `http://127.0.0.1:3000/api/createBlog/uploadimg`, // 服务器地址, 如果action为空，则采用base64插入图片
            // response 为一个函数用来获取服务器返回的具体图片地址
            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
            // 则 return res.data.url
            response: (res) => {
              return res.url;
            },
            headers: () => {}, // 可选参数 设置请求头部
            sizeError: () => {}, // 图片超过大小的回调
            start: () => {}, // 可选参数 自定义开始上传触发事件
            end: () => {}, // 可选参数 自定义上传结束触发的事件，无论成功或者失败
            error: () => {}, // 可选参数 上传失败触发的事件
            success: () => {}, // 可选参数  上传成功触发的事件
            change: (xhr, formData) => {
              // xhr.setRequestHeader('myHeader','myValue')
              // formData.append('token', 'myToken')
            }, // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
          },
          toolbar: {
            // 如果不上传图片到服务器，此处不必配置
            container: toolbarOptions, // container为工具栏，此次引入了全部工具栏，也可自行配置
            handlers: {
              image: function (value) {
                QuillWatch.emit(this.quill.id);
              },
            },
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
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
    submitForm(formName) {
      this.BlogMessage.label = this.BlogMessage.label.toString();
      const date = new Date();
      this.BlogMessage.date = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      createBlog(this.BlogMessage);
    },
    resetForm(formName) {},
    onEditorReady($event) {},
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