import Vue from 'vue';
// 按需导入按钮组件
import {
  Button,
  Form,
  FormItem,
  Input,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Loading,
  Dialog,
  MessageBox,
  Tag,
  Tree,
  Notification,
  Cascader,
  Alert,
  Tabs,
  TabPane,
  Steps,
  Step,
  CheckboxGroup,
  Checkbox,
  Upload,
} from 'element-ui';

// 全局注册组件
Vue.component(Button.name, Button);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Container.name, Container);
Vue.component(Header.name, Header);
Vue.component(Aside.name, Aside);
Vue.component(Main.name, Main);
Vue.component(Footer.name, Footer);
Vue.component(Menu.name, Menu);
Vue.component(MenuItem.name, MenuItem);
Vue.component(MenuItemGroup.name, MenuItemGroup);
Vue.component(Submenu.name, Submenu);
Vue.component(Breadcrumb.name, Breadcrumb);
Vue.component(BreadcrumbItem.name, BreadcrumbItem);
Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Switch.name, Switch);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);
Vue.component(Tree.name, Tree);
Vue.component(Cascader.name, Cascader);
Vue.component(Alert.name, Alert);
Vue.component(Tabs.name, Tabs);
Vue.component(TabPane.name, TabPane);
Vue.component(Steps.name, Steps);
Vue.component(Step.name, Step);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Upload.name, Upload);
// 注意：这个Loading是一个插件，不是组件，不能通过Vue.component(Loading.name, Loading); 方法注册，只能通过Vue.use(Loading)挂载
Vue.use(Loading);

// 在Vue的原型上挂一个$message属性，Vue的实例对象都能通过原型链的向上查找规则访问到这个$message
Vue.prototype.$message = Message;

Vue.prototype.$confirm = MessageBox.confirm;

Vue.prototype.$notify = Notification;
