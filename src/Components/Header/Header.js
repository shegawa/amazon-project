
import './header.css';
import LowerHeader from './LowerHeader';
import { Link } from 'react-router-dom';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useContext } from 'react';
import { DataContext } from '../DataProvider/DataProvider';
import { auth } from '../../Utility/Firebase';


function Header() {

    const [{user, basket }, dispatch] = useContext(DataContext)

    const totalItem = basket?.reduce((amount, item) => { return item.amount + amount }, 0);


    return (
        <section className='fixed'>
            <section>
                <div className='header-container'>
                    <div className='logo-container'>
                        <Link to="/">
                            <img src='https://pngimg.com/uploads/amazon/amazon_PNG11.png' alt="amazon logo" />
                        </Link>
                        <span><FmdGoodOutlinedIcon /></span>
                        <div className='delivery'>
                            <p>Delivered to</p>
                            <span>Ethiopia</span>
                        </div>
                    </div>
                    <div className='search'>
                        <select>
                            <option value="">All</option>
                        </select>
                        <input type="text" placeholder='Search Amazon' />
                        <SearchIcon size={25} />
                    </div>
                    <div className='order'>
                        <Link to='' className='language'>
                            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1200px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png' alt="US Flag" />
                            <select>
                                <option value="">EN</option>
                            </select>
                        </Link>
                        <Link to={!user && '/auth'}>
                            <div>
                                {user ? (
                                    <>
                                        <p>Hello{user?.email?.split("@")[0]}</p>
                                        <span onClick={() => auth.signOut()}>Sign Out</span>
                                    </>
                                ) : (
                                    <>
                                        <p>Hello, Sign In</p>
                                        <span>Account and Lists</span>
                                    </>
                                )}


                            </div>
                        </Link>
                        <Link to="/orders">
                            <p>Returns</p>
                            <span>& Orders</span>
                        </Link>
                        <Link to='/cart' className='cart'>
                            <ShoppingCartOutlinedIcon size={35} />
                            <span> {totalItem} </span>
                        </Link>
                    </div>
                </div>
            </section>
            <LowerHeader />
        </section>
    );
}

export default Header;