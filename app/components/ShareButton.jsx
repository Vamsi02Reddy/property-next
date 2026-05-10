"use client";
import {
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`
  return (
    <>
    <h3 className="font-bold text-xl pt-2 text-center">Share this Property : </h3>
    <div className="flex gap-3 justify-center pb-5">
      <FacebookShareButton url={shareUrl} quote={property.name} hashtag={`#${property.type.replace(/\s/g,'')}ForRent`}> 
        <FacebookIcon size={40} round={true} />
      </FacebookShareButton>
      <WhatsappShareButton url={shareUrl} quote={property.name} seperator='::'> 
        <WhatsappIcon size={40} round={true} />
      </WhatsappShareButton>
      <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property : ${shareUrl}`}> 
        <EmailIcon size={40} round={true} />
      </EmailShareButton>
    </div>
    </>
  );
};

export default ShareButton;
