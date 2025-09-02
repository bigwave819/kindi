import { MapPinHouse ,User , Clock3 } from "lucide-react";


function ContactLocations() {
    return ( 
        <div className="space-y-12">
            <div>
                <h1 className="text-2xl font-bold">Visit Our Restaurant</h1>
            <p>Experience the authentic taste of Rwanda in our welcoming atmosphere.</p>
            </div>
            <div className="flex flex-row space-x-5">
                <div>
                    <MapPinHouse />
                </div>
                <div>
                    <p>Kindi Coffee, </p>
                    <p>Nyanza Rwanda</p>
                </div>
            </div>
            <div className="flex flex-row space-x-5">
                <div >
                    <User />
                </div>
                <div>
                    <p>+250 798 342 542, </p>
                    <p>kindi@gmail.com</p>
                </div>
            </div>
            <div className="flex flex-row space-x-5">
                <div>
                    <Clock3 />
                </div>
                <div>
                    <p>Mon - Fri: 7:00 AM - 8:00 PM</p>
                    <p>Sat - Sun: 8:00 AM - 6:00 PM</p>
                </div>
            </div>
        </div>
     );
}

export default ContactLocations;