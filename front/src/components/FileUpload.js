import { InputFile } from "styles/Components/CommonStyle";
import { ChangeButton } from "styles/User/ProfileStyle";
import { LABEL } from "utils/constants";
import { useRef } from "react";

/**
 * 파일 업로드 컴포넌트 입니다.
 * @param {string} id 업로드 요청을 보낼 id
 * @param {string} prevImage 이전 이미지 url
 * @returns {JSX.Element}
 * @constructor
 */
function FileUpload({ prevImage = "", setEditImg, setImgUrl }) {
  const refFileUpload = useRef();

  const handleUploadFile = async (e) => {
    e.preventDefault();
    if (e.target.files[0].size >= 5242880)
      return alert("이미지는 5MB 이하만 업로드 가능합니다.");

    const formData = new FormData();
    formData.append("filename", e.target.files[0]);
    formData.append("prevImage", prevImage);

    setImgUrl(URL.createObjectURL(e.target.files[0]));
    setEditImg(formData);
  };

  return (
    <>
      <InputFile
        type="file"
        ref={refFileUpload}
        accept="image/*"
        onChange={handleUploadFile}
      />
      <ChangeButton onClick={() => refFileUpload.current.click()}>
        {LABEL.CHANGE_IMAGE}
      </ChangeButton>
    </>
  );
}

export default FileUpload;
