<template>
    <div>
        <search @search="handleSearch"></search>

        <div class="main-box">
            <div class="block" style="margin: 10px auto">
                <!--      类别菜单-->
                <div class="book-menu">
                    <ul v-for="(item, index) in icons" :key="index">
                        <li>
                            <i class="iconfont" v-html="item.value"></i>
                            <!--              跳转到bookList页面，参数为类别id-->
                            <span
                                v-for="(category, index2) in item.categories"
                                :key="index2"
                            >
                                <router-link
                                    :to="{
                                        path: '/booklist',
                                        query: { categoryId: category.id },
                                    }"
                                >
                                    <a href="/person"
                                        ><span>{{ category.name }}</span></a
                                    >
                                </router-link>
                                <span
                                    v-if="index2 != item.categories.length - 1"
                                >
                                    /
                                </span>
                            </span>
                        </li>
                    </ul>
                </div>
                <!--轮播图-->
                <div>
                    <el-carousel
                        height="370px"
                        style="border-radius: 20px; width: 600px"
                    >
                        <el-carousel-item
                            v-for="carousel in carousels"
                            :key="carousel.id"
                        >
                            <router-link :to="'/bookview/' + carousel.bookId">
                                <img
                                    style="
                                        height: 370px;
                                        width: 600px;
                                        object-fit: contain;
                                        background-color: black;
                                    "
                                    :src="baseApi + carousel.img"
                                />
                            </router-link>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <!--推荐书籍-->
            <div style="margin-top: 30px">
                <i class="el-icon-a-02" style="color: #ff5e5e;font-size: 28px; font-weight: 600;">
                    推荐书籍
                </i>
            </div>

            <div style="margin: 20px auto">
                <el-row :gutter="20">
                    <el-col
                        :span="6"
                        v-for="book1 in book"
                        :key="book1.id"
                        style="margin-bottom: 20px"
                    >
                        <router-link :to="'bookview/' + book1.id">
                            <el-card
                                :body-style="{
                                    padding: '0px',
                                    background: '#e3f5f4',
                                }"
                            >
                                <img
                                    :src="baseApi + book1.imgs"
                                    style="width: 100%; height: 300px"
                                />
                                <div style="padding: 5px 10px">
                                    <span style="font-size: 18px"
                                        ><b>{{ book1.name }}</b></span
                                    ><br />
                                    <span style="color: red; font-size: 15px"
                                        ><b>￥{{ book1.price }}</b></span
                                    >
                                </div>
                            </el-card>
                        </router-link>
                    </el-col>
                </el-row>
            </div>


             <!--书籍列表-->
             <div style="margin-top: 30px">
                <i class="el-icon-a-02" style="color: #5eff86;font-size: 28px; font-weight: 600;">
                    书籍列表
                </i>
            </div>

            <div style="margin: 20px auto">
                <el-row :gutter="20">
                    <el-col
                        :span="6"
                        v-for="book1 in SimBook"
                        :key="book1.id"
                        style="margin-bottom: 20px"
                    >
                        <router-link :to="'bookview/' + book1.id">
                            <el-card
                                :body-style="{
                                    padding: '0px',
                                    background: '#e3f5f4',
                                }"
                            >
                                <img
                                    :src="baseApi + book1.imgs"
                                    style="width: 85%; height: 150px"
                                />
                                <div style="padding: 5px 10px">
                                    <span style="font-size: 15px"
                                        ><b>{{ book1.name }}</b></span
                                    ><br />
                                    <span style="color: red; font-size: 12px"
                                        ><b>￥{{ book1.price }}</b></span
                                    >
                                </div>
                            </el-card>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import search from "../../components/Search";
export default {
    name: "TopView",
    data() {
        return {
            //轮播图
            carousels: [],
            //推荐商品
            book: [],
            // 普通书籍
            SimBook:[],
            baseApi: this.$store.state.baseApi,

            //分类icon，每个icon包含id、value、categories对象数组.category：id，name
            icons: [],
            //搜索内容
            searchText: "",
            baseApi: this.$store.state.baseApi,
        };
    },
    components: {
        search,
    },
    created() {
        this.request.get("/api/book").then((res) => {
            if (res.code === "200") {
                console.log("登录成功: ", res.data)
                this.book = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });
        this.request.get("/api/book/SimBook").then((res) => {
            if (res.code === "200") {
                console.log("登录成功: ", res.data)
                this.SimBook = res.data;
            } else {
                this.$message.error(res.msg);
            }
        });

        this.request.get("/api/icon").then((res) => {
            if (res.code === "200") {
                this.icons = res.data;
                if (this.icons.length > 6) {
                    // 截取前六个分类
                    this.icons = this.icons.slice(0, 6);
                }
            }
        });
        this.request.get("/api/carousel").then((res) => {
            if (res.code === "200") {
                this.carousels = res.data;
            }
        });
    },
    methods: {
        handleSearch(text) {
            this.searchText = text;
            this.$router.push({
                path: "/bookList",
                query: { searchText: this.searchText },
            });
        },
    },
};
</script>

<style scoped>
.main-box {
    background-color: white;
    border: white 2px solid;
    border-radius: 40px;
    padding: 20px 40px;
    margin: 5px auto;
}
.book-menu {
    float: left;
    height: 370px;
    margin-right: 130px;
}
.book-menu li {
    list-style: none;
    overflow: hidden;
    margin-bottom: 35px;
}
.book-menu li a,
span {
    font-size: 20px;
    color: #6c6969;
}
.book-menu a span:hover {
    color: #00b7ff;
}
</style>