import { resourcesLinks,platformLinks,communityLinks } from "../../constants";


const Footer = ()=>{
    return(
        <footer className="mt-20 border-t py-10 border-neutral-700 px-10 text-center">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-md font-semibold mb-4 text-white">Resources</h3>
                    <ul className="space-y-2">
                        {resourcesLinks.map((Link,index)=>(
                            <li key={index}>
                                <a className="text-neutral-300 hover:text-white" href={Link.href}>{Link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-md font-semibold mb-4 text-white">Community</h3>
                    <ul className="space-y-2">
                        {communityLinks.map((Link,index)=>(
                            <li key={index}>
                                <a className="text-neutral-300 hover:text-white" href={Link.href}>{Link.text}</a>
                            </li>
                        ))}
                    </ul>
                 </div>

                 <div>
                    <h3 className="text-md font-semibold mb-4 text-white">Platform</h3>
                    <ul className="space-y-2">
                        {platformLinks.map((Link,index)=>(
                            <li key={index}>
                                <a className="text-neutral-300 hover:text-white" href={Link.href}>{Link.text}</a>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            
        </footer>
    );
}

export default Footer;