import './footer.css'
import { FaGithub,FaInstagram } from "react-icons/fa"
import { MdEmail } from "react-icons/md"

export default function Footer(){
    return <footer className="footer-container">
        <h1 className="logo">
            watcher
        </h1>
        <div className="footer-text">
            <h2>about us</h2>
            <p>Watcher is free tv shows streaming website with zero ads, it allows you watch tv shows online, watch tv shows online free in high quality for free. You can also download full tv shows and watch it later if you want.This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>
        </div>
        <div className="contact">
            <h2>contact me</h2>
            <div className="contact-logos">
                <FaGithub size={25} className='contact-logo'/>
                <MdEmail size={25} className='contact-logo'/>
                <FaInstagram size={25} className='contact-logo'/>
            </div>
        </div>
    </footer>
}