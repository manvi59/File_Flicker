"use client";
import React, { useEffect, useState } from "react";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { app } from "@/app/firebaseConfig";
import Image from "next/image";
import file_img from "@/public/file_img.jpg";
// import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from "@clerk/nextjs";

const FilePreview = ({ params }) => {
  const db = getFirestore(app);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();
  const [shortUrl, setShortUrl] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [email, setEmail] = useState();
  const [fileSize, setFileSize] = useState();
  const [fileType, setFileType] = useState();
  const [val, setValue] = useState();
  const { user } = useUser();

  useEffect(() => {
    console.log(params?.fileId);
    params?.fileId && getFileInfo();
  }, []);

  const getFileInfo = async () => {
    const docRef = doc(db, "uplodedFile", params?.fileId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setFile(docSnap.data());
      setFileName(docSnap.data().fileName);
      setShortUrl(docSnap.data().shortUrl);
      setFileUrl(docSnap.data().fileUrl);
      setFileSize(docSnap.data().fileSize);
      setFileType(docSnap.data().fileType);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }

    // console.log(file);
  };

  // const SendEmail=()=>{

  //   const data={
  //     emailToSend:email,
  //     userName:user?.fullName,
  //     fileName:file.fileName,
  //     fileSize:file.fileSize,
  //     fileType:file.fileType,
  //     shortUrl:file.shortUrl
  //   };
  //   GlobalApi.SendEmail(data).then(resp=>{
  //     console.log(resp);
  //   });

  // }

  const sendwhatsapp = () => {
    console.log("hii");
    console.log(val);

    var phonenumber = "+7728896286";

    //  let newFileUrl = fileUrl.replace("&","%0a");

    var file_Name = fileName;
    var file_Size = fileSize;
    var file_Type = fileType;
    const file_Url = fileUrl.replace("&", "").toString();
    var short_Url = shortUrl;

    // console.log(fileUrl);
    // console.log(file_Url);

    const origilaURl = `https://firebasestorage.googleapis.com/v0/b/my-file-app-41268.appspot.com/o/file-upload%2F2024-03-27.png?alt=media&token=873be77b-b0ee-482b-8094-bfa6ec45d31b`;

    const mutatedUrl = `=url%3Dhttps%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmy-file-app-41268.appspot.com%2Fo%2Ffile-upload%252F2024-03-27.png%3Falt%3Dmedia%26token%3D873be77b-b0ee-482b-8094-bfa6ec45d31b`;

    // url%3Dhttps%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmy-file-app-41268.appspot.com%2Fo%2Ffile-upload%252FScreenshot%20(388).png%3Falt%3Dmedia%26token%3Dd8b60e79-bb45-49c7-8882-799e611bb4e0

    // url%3Dhttps%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmy-file-app-41268.appspot.com%2Fo%2Ffile-upload%2Fmanvi.PNG%3Falt%3Dmedia%26token%3Df312e023-7155-4ca3-be55-991799a152b3

    let newUrl = fileUrl.replace("https://", "url%3Dhttps%3A%2F%2F");

    for (let i = 1; i <= 5; i++) {
      newUrl = newUrl.replace("/", "%2F");
    }
    newUrl = newUrl.replace("upload%2F", "upload%252F");

    newUrl = newUrl.replace("?alt=", "%3Falt%3D");
    newUrl = newUrl.replace("&", "%26");
    newUrl = newUrl.replace("=", "%3D");

    console.log(newUrl);

    var url = "https://wa.me/+7728896286?text=";

    //  var add=`\nfile_Url:https://testurl.com?test=123&&test2=456`;
    // var add=`\nfile_Url:${fileUrl}`;
    // var res=url+add;

    var url =
      "https://wa.me/" +
      phonenumber +
      "?text=" +
      "*file_Name :* " +
      file_Name +
      "%0a" +
      "*file_Size :* " +
      file_Size +
      "%0a" +
      "*file_Type:* " +
      file_Type +
      "%0a" +
      "*file_Url:* " +
      newUrl +
      "%0a" +
      "*file_Url :* " +
      short_Url +
      "%0a%0a" ;

    // var url=`https://wa.me/${phonenumber}?text=${fileUrl}`
    window.open(url, "_blank").focus();
  };

  // function sendwhatsapp(){
  //   var phonenumber = "+9571631973";

  //   var file_Name = fileName;
  //   var file_Size = fileSize;
  //   var file_Type = fileType;
  //   var file_Url = fileUrl;

  //   var url = "https://wa.me/+9571631973?text="
  //   var url = "https://wa.me/" + phonenumber + "?text="
  //   +"*file_Name :* "+file_Name+"%0a"
  //   +"*file_Size :* "+file_Size+"%0a"
  //   +"*file_Type:* "+file_Type+"%0a"
  //   +"*file_Url :* "+file_Url
  //   +"%0a%0a"
  //   +"This is an example of send HTML form data to WhatsApp";
  //   window.open(url, '_blank');
  // }

  // const change=Event=()=>{

  //   setValue(Event.target.value)

  // }

  return (
    <>
      <div className="main font-serif">
        <div className="flex p-10">
          <a href="#" className="font-bold ">
            Go To the Upload
          </a>
        </div>

        <div className="grid md:grid-cols-2 p-10 ">
          <div className="  flex justify-center p-10 border border-slate-400 rounded-md">
            <div>
              <Image src={file_img} height={300} width={300} alt="file image" />
              <label className="font-bold  flex justify-center py-2">
                {fileName}
              </label>
            </div>
          </div>

          <div className="p-10 border border-slate-100 rounded-md">
            <form className="space-y-3">
              <div className="space-y-2">
                <div>
                  <label className="font-bold">Short Url</label>{" "}
                </div>
                <h1 className="border border-slate-300 w-full h-10 rounded-md">
                  {shortUrl}
                </h1>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="font-bold">File Url</label>{" "}
                </div>
                <a
                  href={fileUrl}
                  target="_blank"
                  className="border border-slate-300 w-full  rounded-md"
                >
                  {fileUrl}
                </a>
              </div>

              <div className="space-y-2">
                <div>
                  <label className="font-bold">Send File to Email</label>{" "}
                </div>
                {/* <div>
                  <input type='email' placeholder='example@gmail.com' name='email' id='email' className='border border-slate-300 w-full h-10 rounded-md' />
                </div>

                <div>
                  <button   className='bg-primary text-white w-full h-10 rounded-md font-bold hover:bg-blue-400' >Send Email</button>
                </div> */}

                <div>
                  <input
                    type="number"
                    placeholder="91"
                    name="phone"
                    id="phone"
                    className="border border-slate-300 w-full h-10 rounded-md"
                    value={val}/>
                </div>

                <div>
                  <button
                    type="button"
                    onClick={() => sendwhatsapp()}
                    className="bg-primary text-white w-full h-10 rounded-md font-bold hover:bg-blue-400"
                  >
                    Send Via WhatsApp
                  </button>
                </div>

                {/* <a href={`https://wa.me/9571631973/?link=${fileUrl}`}>hii send </a>  */}

                {/* correct url to send data from whatsapp */}

                {/* <a href="https://wa.me/+9571631973?text=url%3Dhttps%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fmy-file-app-41268.appspot.com%2Fo%2Ffile-upload%252F2024-03-27.png%3Falt%3Dmedia%26token%3D873be77b-b0ee-482b-8094-bfa6ec45d31b"
        target="_blank">Share on WhatsApp</a> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilePreview;
