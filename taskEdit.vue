<template>
  <div class="app-container calendar-list-container">
    <el-form
      label-position="right"
      :inline="true"
      ref="conditionForm"
      :model="conditionForm"
      label-width="100px"
      class="userList-searchform"
    >
      <el-row type="flex" justify="space-between">
        <el-col :span="22" style="text-align: left;">
          <el-form-item :label="$t('organizationListLang.state')">
            <el-select v-model="conditionForm.state" placeholder="请选择状态">
              <el-option
                v-for="item in stateList"
                :key="item.value"
                :label="item.text"
                :value="item.text"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="ml" :label="$t('organizationListLang.productTaskName')">
            <el-select v-model="conditionForm.productTaskName" placeholder="请选择任务名称">
              <el-option
                v-for="item in showList"
                :key="item.workId"
                :label="item.productTaskName"
                :value="item.productTaskName"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="btn-top ml"
            type="primary"
            :disabled="isDisabled"
            @click="addOrg"
            icon="el-icon-plus"
          >{{$t('table.create')}}</el-button>

          <br />
          <el-form-item :label="$t('organizationListLang.startDate')">
            <!-- <el-input @keyup.enter.native="handleFilter" v-model="conditionForm.startDate"></el-input> -->
            <el-date-picker v-model="conditionForm.startDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('organizationListLang.endDate')">
            <!-- <el-input @keyup.enter.native="handleFilter" v-model="conditionForm.endDate"></el-input> -->
            <el-date-picker v-model="conditionForm.endDate" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-button
            class="btn-top"
            type="primary"
            @click="handleFilter"
            icon="el-icon-search"
          >{{$t('table.search')}}</el-button>
          <el-button
            class="btn-top"
            type="primary"
            @click="handleRestForm"
            icon="el-icon-refresh"
          >{{$t('table.reset')}}</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="grid-content">
      <div class="data-list">
        <el-table
          :key="tableKey"
          :data="showList"
          v-loading="listLoading"
          element-loading-text="加载中"
          border
          fit
          highlight-current-row
          style="width: 100%"
          @row-click="handle"
        >
          <el-table-column prop="projectName" :label="$t('organizationListLang.projectName')"></el-table-column>
          <el-table-column
            prop="date"
            :formatter="dateFormat"
            :label="$t('organizationListLang.date')"
          ></el-table-column>
          <el-table-column prop="workId" :label="$t('organizationListLang.workId')"></el-table-column>
          <el-table-column prop="productMatter" :label="$t('organizationListLang.workName')"></el-table-column>
          <el-table-column prop="city" :label="$t('organizationListLang.city')"></el-table-column>
          <el-table-column prop="productLine" :label="$t('organizationListLang.productLine')"></el-table-column>
          <el-table-column prop="productMatter" :label="$t('organizationListLang.productMatter')"></el-table-column>
          <el-table-column prop="productType" :label="$t('organizationListLang.productType')"></el-table-column>
          <el-table-column prop="taskAmount" :label="$t('organizationListLang.workQuantity')"></el-table-column>
          <el-table-column prop="unit" :label="$t('organizationListLang.unit')"></el-table-column>
          <el-table-column
            prop="startDate"
            :formatter="dateFormat"
            :label="$t('organizationListLang.startDate')"
          ></el-table-column>
          <el-table-column
            prop="endDate"
            :formatter="dateFormat"
            :label="$t('organizationListLang.endDate')"
          ></el-table-column>
          <el-table-column prop="workTime" :label="$t('organizationListLang.workTime')"></el-table-column>
          <el-table-column prop="jobType" :label="$t('organizationListLang.jobType')"></el-table-column>
          <el-table-column prop="unit" :label="$t('organizationListLang.standardEfficiency')"></el-table-column>
          <el-table-column prop="unit" :label="$t('organizationListLang.settle')"></el-table-column>
          <el-table-column prop="status" :label="$t('organizationListLang.state')"></el-table-column>
          <el-table-column prop="unit" :label="$t('organizationListLang.reason')"></el-table-column>
          <el-table-column prop="unit" :label="$t('organizationListLang.taskPackage')"></el-table-column>

          <el-table-column
            align="center"
            label="操作"
            class-name="small-padding fixed-width"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                :disabled="flag"
                @click="handleEdit(scope.$index,scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="flag"
                @click="singleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="pagination-container">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="conditionForm.pageNo"
            :page-sizes="[10,50,100,150,200]"
            :page-size="conditionForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog
      width="600px"
      title="作业登记维护"
      :visible.sync="dialogFormVisible"
      @close="closeDialog"
      v-if="dialogFormVisible"
    >
      <el-form :model="editForm" ref="editForm" :rules="rules">
        <el-form-item
          :label="$t('organizationListLang.date')"
          :label-width="formLabelWidth"
          prop="date"
        >
          <el-date-picker
            v-model="editForm.date"
            type="date"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.projectName')"
          :label-width="formLabelWidth"
          prop="projectName"
        >
          <!-- <el-input v-model="editForm.projectName" autocomplete="off"></el-input> -->
          <el-select v-model="editForm.projectName" placeholder="请选择项目名称">
            <el-option
              v-for="item in projectNameList"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.cityName')"
          :label-width="formLabelWidth"
          prop="cityName"
        >
          <el-select v-model="editForm.provinceName" placeholder="城市名称" @change="selectCity">
            <el-option
              v-for="item in provinceList"
              :key="item.provinceAdCode"
              :label="item.provinceName"
              :value="item.provinceName"
            ></el-option>
          </el-select>
          <el-select v-model="editForm.cityName" placeholder="城市名称">
            <el-option
              v-for="item in cityList"
              :key="item.adCode"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('organizationListLang.productLine')"
          :label-width="formLabelWidth"
          prop="productLine"
        >
          <el-select v-model="editForm.productLine" placeholder="请选择生产线">
            <el-option
              v-for="item in productLineList"
              :key="item.value"
              :label="item.text"
              :value="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.productMatter')"
          :label-width="formLabelWidth"
          prop="productMatter"
        >
          <!-- <el-input v-model="editForm.productMatter" autocomplete="off"></el-input> -->
          <el-select v-model="editForm.productMatter" placeholder="请选择生产事项">
            <el-option
              v-for="item in productList"
              :key="item.projectMattersId"
              :label="item.productMatter"
              :value="item.productMatter"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.productTaskName')"
          :label-width="formLabelWidth"
          prop="productTaskName"
        >
          <!-- <el-input v-model="editForm.productTaskName" autocomplete="off" :disabled="codeDisabled"></el-input> -->
          <el-select v-model="editForm.productTaskName" placeholder="请选择生产事项">
            <el-option
              v-for="item in productNameList"
              :key="item.projectMattersId"
              :label="item.productTaskName"
              :value="item.productTaskName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.productType')"
          :label-width="formLabelWidth"
          prop="productType"
        >
          <el-select v-model="editForm.productType" placeholder="请选择生产类型">
            <el-option
              v-for="item in productTypeList"
              :key="item.value"
              :label="item.text"
              :value="item.text"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.taskQuantity')"
          :label-width="formLabelWidth"
          prop="taskAmount"
        >
          <el-input v-model="editForm.taskAmount" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.jobType')"
          :label-width="formLabelWidth"
          prop="jobType"
        >
          <el-select v-model="editForm.jobType" placeholder="请选择上班类型">
            <el-option
              v-for="item in jobType"
              :key="item.value"
              :label="item.text"
              :value="item.text"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          :label="$t('organizationListLang.goTime')"
          :label-width="formLabelWidth"
          prop="startDate"
        >
          <el-date-picker
            v-model="editForm.startDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          :label="$t('organizationListLang.endTime')"
          :label-width="formLabelWidth"
          prop="endDate"
        >
          <el-date-picker
            v-model="editForm.endDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('organizationListLang.workTime')" :label-width="formLabelWidth">
          <el-input v-model="wokingTime"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false;handleRest();resetForm()">取 消</el-button>
        <el-button type="primary" @click="saveData()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  findList,
  findOrgin,
  findListOrgin,
  deleteOrg,
  addOrgList,
  updateOrgList,
  existOrg,
  addWork,
  findWork,
  getCityList,
  selectCityList
} from "@/api/task/taskAdd";
import { geo } from "@/api/project/userInfo";
import { getUserRoles } from "@/api/task/taskManage";
import { regionData, CodeToText } from "element-china-area-data";
import moment from "moment";

const typeOptions = [
  { text: "送料办公室", value: 1 },
  { text: "调度", value: 2 },
  { text: "用料单位", value: 3 },
  { text: "物流公司", value: 4 },
  { text: "装卸", value: 5 },
  { text: "仓库", value: 6 },
  { text: "专业公司", value: 7 }
];

// const contractStatusOptions = [
//   { text: "已审批", value: 0 },
//   { text: "审批中", value: 1 },
//   { text: "驳回", value: 2 }
// ];
const stateList = [
  { text: "已审批", value: 0 },
  { text: "审批中", value: 1 },
  { text: "驳回", value: 2 }
];
const productLineList = [
  { text: "分门址线", value: 0 },
  { text: "背景线", value: 1 },
  { text: "道路线", value: 2 },
  { text: "采集线", value: 3 },
  { text: "Mape", value: 4 },
  { text: "测试线", value: 5 },
  { text: "研发线", value: 6 },
  { text: "UI线", value: 7 },
  { text: "其他", value: 8 }
];
const productTypeList = [
  { text: "人工生产", value: 0 },
  { text: "自动化生产", value: 1 },
  { text: "人工质检", value: 2 },
  { text: "自动化质检", value: 3 },
  { text: "工艺", value: 4 },
  { text: "研发", value: 5 },
  { text: "测试", value: 6 },
  { text: "UI", value: 7 },
  { text: "其他", value: 8 }
];
const workType = [
  { text: "会议", value: 0 },
  { text: "培训&练习", value: 1 },
  { text: "生产", value: 2 },
  { text: "质检", value: 3 },
  { text: "管理相关", value: 4 },
  { text: "损耗相关", value: 5 },
  { text: "其他", value: 6 }
];
const jobType = [
  { text: "上班", value: 0 },
  { text: "加班", value: 1 },
  { text: "请假", value: 2 }
];

export default {
  name: "user_manage",
  data() {
    const vValidate = (rule, value, callback) => {
      if (value !== "" && typeof value !== "undefined") {
        const reg = /\S/;
        const flag = reg.test(value);
        if (!flag) {
          callback(new Error("不允许输入为空"));
        }
        callback();
      } else {
        callback();
      }
    };
    return {
      flag: "",
      isDisabled: false,
      rowid: "",
      codeDisabled: false,
      listLoading: false,
      tableKey: 0,
      showList: [], //显示的列表
      projectNameList: [],
      provinceList: [],
      productList: [],
      cityList: [],
      productNameList: [],
      total: null,
      conditionForm: {
        pageNo: 1,
        pageSize: 10,
        projectName: "",
        productLine: "",
        productMatter: "",
        productType: "",
        productEfficiency: "",
        unit: "",
        accuracy: "",
        cityName: "",
        // productTaskName: "",
        taskQuantity: "",
        workType: ""
      },
      typeOptions: typeOptions,
      productLineList: productLineList,
      productTypeList: productTypeList,
      workType: workType,
      jobType: jobType,
      stateList: stateList,
      isAddOrg: false, //判断新增还是删除 false新增、true编辑
      dialogFormVisible: false,
      formLabelWidth: "120px",
      editForm: {
        gid: undefined,
        projectName: "",
        productLine: "",
        productMatter: "",
        productType: "",
        productEfficiency: "",
        unit: "",
        accuracy: "",
        cityName: "",
        productTaskName: "",
        taskQuantity: "",
        workType: ""
      },

      rules: {
        projectName: [
          { required: true, message: "请输入项目名称" },
          { validator: vValidate, trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入城市名称" }],
        productMatter: [
          { required: true, message: "请输入生产事项" },
          { validator: vValidate, trigger: "blur" }
        ],
        productTaskName: [
          { required: true, message: "请输入生产任务名称" },
          { validator: vValidate, trigger: "blur" }
        ],
        taskAmount: [
          { required: true, message: "请输入任务量" },
          { validator: vValidate, trigger: "blur" }
        ],
        unit: [
          { required: true, message: "请输入生产单位" },
          { validator: vValidate, trigger: "blur" }
        ],
        date: [
          { required: true, message: "请输入日期" },
          { validator: vValidate, trigger: "blur" }
        ],
        productLine: [
          { required: true, message: "请选择生产线" },
          { validator: vValidate, trigger: "blur" }
        ],
        productType: [
          { required: true, message: "请选择生产类型" },
          { validator: vValidate, trigger: "blur" }
        ],
        jobType: [
          { required: true, message: "请选择上班类型" },
          { validator: vValidate, trigger: "blur" }
        ],
        startDate: [
          { required: true, message: "请选择开始日期" },
          { validator: vValidate, trigger: "blur" }
        ],
        endDate: [
          { required: true, message: "请选择结束日期" },
          { validator: vValidate, trigger: "blur" }
        ]
      },
      options: regionData,
      // selectedOptions: ["110000", "110100", "110101"],
      selectedOptions: []
    };
  },
  computed: {
    wokingTime() {
      var start = new Date(this.editForm.startDate).getTime();
      var end = new Date(this.editForm.endDate).getTime();
      // console.log(this.editForm.endDate);
      // console.log(start);
      // console.log(end);
      let workingTime = end - start;
      // console.log(workingTime);

      let time = this.getDuration(workingTime);
      this.editForm.workTime = time;
      return time;
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    selectCity(val) {
      let city = this.provinceList.find(item => {
        return item.provinceName == val;
      });
      const cityData = {
        provinceName: val,
        provinceAdCode: city.provinceAdCode
      };
      // console.log(cityData);
      selectCityList(cityData).then(res => {
        this.cityList = res;
        console.log(this.cityList);
      });
    },
    getDuration(my_time) {
      var days = my_time / 1000 / 60 / 60 / 24;
      var daysRound = Math.floor(days);
      var hours = my_time / 1000 / 60 / 60 - 24 * daysRound;
      var hoursRound = Math.floor(hours);
      var minutes = my_time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
      var minutesRound = Math.floor(minutes);
      var seconds =
        my_time / 1000 -
        24 * 60 * 60 * daysRound -
        60 * 60 * hoursRound -
        60 * minutesRound;
      // console.log(
      //   "转换时间:",
      //   daysRound + "天",
      //   hoursRound + "时",
      //   minutesRound + "分",
      //   seconds + "秒"
      // );
      var time = daysRound + "天" + hoursRound + "时";
      return time;
    },
    getPageData() {
      this.listLoading = true;
      const data = {
        projectName: this.conditionForm.projectName.replace(/\s+/g, "")
      };
      const params = Object.assign({}, this.conditionForm, data);
      // console.log(params);
      findWork(params).then(res => {
        // console.log(res.list, 88888);
        this.showList = res.list;
        this.showList.find(item => {
          if (item.status == "已审批") {
            item.flag = true;
          } else {
            item.flag = false;
          }
          console.log(item);
        });
        console.log(this.showList);
        this.total = res.total;
        this.listLoading = false;
      });
      getUserRoles().then(res => {
        let rolestring =
          "生产项目管理质检小组长生产小组长超级管理员生产组长质检组长";
        let canClick = false;
        res.forEach(o => {
          if (rolestring.indexOf(o) !== -1) {
            canClick = true;
          }
        });

        this.isDisabled = !canClick;
      });
      findList(params).then(res => {
        this.projectNameList = res.list;
        // console.log(res.list, 11);
      });
      findOrgin(params).then(res => {
        this.productList = res.list;
        // console.log(res.list, 11);
      });
      findListOrgin(params).then(res => {
        this.productNameList = res.list;
        // console.log(res.list, 11);
      });
      getCityList().then(res => {
        // console.log(res);
        // this.provinceList = res;
        let newobj = {};
        this.provinceList = res.reduce((preVal, curVal) => {
          newobj[curVal.provinceName]
            ? ""
            : (newobj[curVal.provinceName] = preVal.push(curVal));
          return preVal;
        }, []);
        // console.log(this.provinceList);
      });
    },
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD ");
    },

    handleChange(value) {
      for (var i in value) {
        this.editForm.address1 += CodeToText[value[i]];
      }
    },
    addPro() {
      this.editForm.address = this.editForm.address1 + this.editForm.address2;
    },
    resetConditionForm() {
      this.conditionForm = {
        pageNo: 1,
        pageSize: 10,
        projectName: "",
        type: ""
      };
    },
    handleRestForm() {
      this.resetConditionForm();
      this.getPageData();
    },
    handleFilter() {
      this.conditionForm.pageSize = 10;
      this.conditionForm.pageNo = 1;
      this.getPageData();
      // console.log(this.conditionForm);
    },
    handleSizeChange(val) {
      this.conditionForm.pageSize = val;
      this.getPageData(val);
    },
    handleCurrentChange(val) {
      this.conditionForm.pageNo = val;
      this.getPageData();
    },

    handleEdit: function(index, row) {
      // console.log('编辑',9999)
      this.codeDisabled = true;
      this.dialogFormVisible = true;
      this.isAddOrg = true;
      this.editForm = Object.assign({}, row);
    },
    //保存数据
    saveData() {
      this.$refs["editForm"].validate(valid => {
        if (valid) {
          if (this.isAddOrg) {
            const editFormData = Object.assign({}, this.editForm);
            console.log(editFormData);
            addWork(editFormData).then(editForm => {
              // console.log(editFormData);
              this.dialogFormVisible = false;
              this.getPageData();
              this.handleRest();
              this.resetForm();
              this.$message({
                type: "success",
                message: "修改成功"
              });
            });
          } else {
            const editFormData = Object.assign({}, this.editForm);
            // console.log(editFormData);
            addWork(editFormData).then(editForm => {
              // console.log(editFormData);
              this.dialogFormVisible = false;
              this.getPageData();
              this.handleRest();
              this.resetForm();
              this.$message({
                type: "success",
                message: "创建成功"
              });
            });
          }
        }
      });
    },
    resetEditForm() {
      this.editForm = {
        projectManagerName: "",
        projectName: "",
        address: "",
        x: "",
        y: ""
      };
    },
    handleRest() {
      if (this.isAddOrg) {
        this.resetEditForm();
        this.getPageData();
        this.closeDialog();
      } else {
        this.resetEditForm();
        this.getPageData();
        this.closeDialog();
      }
    },
    // 单条删除
    singleDelete(row) {
      console.log(row);
      this.$confirm("确定删除该组织吗?", this.$t("table.tips"), {
        confirmButtonText: this.$t("table.confirm"),
        cancelButtonText: this.$t("table.cancel"),
        type: "warning"
      })
        .then(() => {
          this.confirmDelete(row.productTaskId);
        })
        .catch(() => {});
    },
    // 确认删除
    confirmDelete(id) {
      const params = { productTaskId: id };
      console.log(params);
      deleteOrg(params).then(res => {
        this.getPageData();
        this.$message({
          type: "success",
          message: "删除成功"
        });
      });
    },
    //选择单行功能
    handle(row, event, column) {
      this.rowid = row.projectId;
      // console.log(this.rowid);
    },
    //打开新增页面
    addOrg() {
      this.codeDisabled = false;
      this.dialogFormVisible = true;
      this.isAddOrg = false;
      this.resetEditForm();
    },

    closeDialog() {
      this.resetForm();
    },

    resetForm(editForm) {
      this.$refs.editForm.resetFields();
    },

    //判断组织名称是否存在
    checkOrg() {
      if (this.editForm.projectName == "") {
        return;
      }
      if (this.isAddOrg) {
        const editFormData = Object.assign({}, this.editForm);
        existOrg(editFormData).then(editForm => {
          if (editForm.gid == null) {
            // this.$message('可以编辑该组织名称')
          } else {
            this.$message("该组织名称已存在，请重新编辑组织名称");
          }
        });
      } else {
        const editFormData = Object.assign({}, this.editForm);
        existOrg(editFormData).then(editForm => {
          if (editForm == null) {
            // this.$message('可以创建该组织名称')
          } else {
            this.$message("该组织名称已存在，请重新创建");
          }
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.btn-top {
  vertical-align: top;
}
.upload-top {
  margin-left: 10px;
  display: inline-block;
}
.ml {
  margin-left: 15px;
}
</style>
