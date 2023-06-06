import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className='footer-center'>
            <div className="footer py-10 bg-sky-800 text-white">
                <div>
                    <span className="footer-title text-2xl text-white">Contact Us</span>
                    <p>123 ABS Street, Uni 21, <br /> Bangladesh <br />
                        +88 123456789 <br />
                        Mon - Fri: 08:00 - 22:00 <br />
                        Sat - Sun: 10:00 - 23:00</p>
                </div>
                <div>
                    <span className="footer-title text-2xl text-white">Follow Us</span>
                    <p className='text-white my-2'>Join us in Social Media</p>
                    <div className="grid grid-flow-col gap-4">
                        <FaFacebookF className='text-xl'></FaFacebookF>
                        <FaInstagram className='text-xl'></FaInstagram>
                        <FaTwitter className='text-xl'></FaTwitter>
                    </div>
                </div>
            </div>
            <div className="footer footer-center p-4 bg-black text-white">
                <div>
                    <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;