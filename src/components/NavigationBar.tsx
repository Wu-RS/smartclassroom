import { NavLink } from "react-router-dom";

export default function NavigationBar() {
  const navList = [
      { name: "实时学情看板", path: "/" },
      { name: "教学效能对比", path: "/comparison" },
      { name: "学生成长档案", path: "/portfolio" },
      { name: "安全与预警", path: "/early-warning" },
      { name: "边缘节点状态", path: "/status" }
  ]
  return (
    <div className="nav-container arrangement-vertical">
        <div className="nav-logo">智课心察</div>
        <div>智慧课堂感知中枢</div>
        <nav className="nav-menu arrangement-vertical">
            {navList.map((item, index) => (
                <NavLink key={index} to={item.path}
                         className={({ isActive }) =>
                             isActive ? "nav-selected" : "nav-unselected"}>
                    {item.name}
                </NavLink>
            ))}
        </nav>
    </div>
  )
}