import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import Backend from '../../../@utils/BackendUrl';
import axios from 'axios';

const MobileNavMenu = ({ strings }) => {

  const [menus, setMenus] = useState([]);
  const [subMenus, setSubMenus] = useState([]);
  
	const init = async () => {
		const res = await axios.post(Backend.URL + '/get_submenu');
		setSubMenus(res.data);
		const resp = await axios.post(Backend.URL + '/get_menu');
		setMenus(resp.data);
	}

  useEffect(()=>{
    init();
  }, []);

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>        
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/collection"}>
            {strings["collection"]}
          </Link>
          <ul className="sub-menu">
            {menus.map((menu) => {
              return (
                <li key={menu.id} className="menu-item-has-children">
                  <Link to={process.env.PUBLIC_URL + "/collection"}>
                    {menu.name}
                  </Link>
                  <ul className="sub-menu">
                    {subMenus.filter(submenu => menu.id === submenu.m_id).map((sm) => {
                      return (
                        <li key={sm.id}>
                          <Link to={process.env.PUBLIC_URL + "/collection"}>
                            {sm.name}
                          </Link>
                        </li>
                      )
                    } )}
                  </ul>
                </li>
              );
            })}
          </ul>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/about"}>
            Membership
          </Link>
        </li>
        <li className="menu-item-has-children">
          <Link to={process.env.PUBLIC_URL + "/blog"}>
            {strings["blog"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            Help
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);
