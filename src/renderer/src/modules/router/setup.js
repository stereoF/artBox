/*
  装配路由及菜单
 */
import fixItems from "./default"; //默认路由
import { HomeName } from "./default"; //统一命名首页路由项（参考前面的默认路由）
import projectItems from "@/modules/router"; //具体业务系统的路由

export default (router) => {
  //获得动态路由
  const dynaItems = getDynamicItems();

  //对齐首页(统一命名首页)
  adpatHome(HomeName, dynaItems);

  //添加动态路由
  dynaItems.forEach((value) => {
    router.addRoute(value);
  });
};

const getDynamicItems = () => {
  /*
    获取动态路由，从指定文件加载或从后端获取
  */
  return projectItems;
};

//默认路由与业务路由对齐首页的路由信息
//所谓对齐，就是大家的name保持一致，这样才能保证动态加入的路由项，覆盖掉前面的path和name相同的路由
const adpatHome = (HomeName, dynaItems) => {
  let home = dynaItems.filter((item) => {
    return item.path === "/";
  });
  if (home.length > 0 && home[0].name !== HomeName) {
    /**
     * 如果业务路由定义了首页，但其name与默认路由首页的name不相同
     * 则将业务路由中首页项的name置为默认名称
     * 因为按照vue-router的规则，addRoute的时候，如果存在同名同路径的路由项，则覆盖之
     * 我们要的就是覆盖默认，以业务路由设置为准
     */
    home[0].name = HomeName;
  }
};

