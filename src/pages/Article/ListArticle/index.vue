<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="id" label="id" width="50"> </el-table-column>
      <el-table-column prop="date" label="日期" width="150"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.row.id)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>

      <div class="table-div"></div>
    </el-table>
    <div class="Pagination">
      <el-pagination
        style="margin-left: 10px"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 10, 15, 20]"
        :page-size="6"
        layout="total, sizes, prev, pager, next, jumper"
        :total="blogsnum"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqgetblogsinfo, reqgetblogsnum, reqdeleteblog } from "@/api";
export default {
  name: "ListArticle",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      blogsnum: 100,
    };
  },
  methods: {
    handleCurrentChange(index) {
      this.getbloginfos(index);
    },
    async getbloginfos(index) {
      const blogsinfo = await reqgetblogsinfo(index);
      this.tableData = blogsinfo.blogs;
    },
    async getblogsnum() {
      const blogsnum = await reqgetblogsnum();
      this.blogsnum = blogsnum.blogsnum[0].num;
    },
    async deleteRow(id) {
      await this.$confirm("此操作将永久删除该博客, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          await reqdeleteblog({ id: id });
          this.getbloginfos(this.currentPage);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getbloginfos(this.currentPage);
    this.getblogsnum();
  },
};
</script>

<style>
</style>