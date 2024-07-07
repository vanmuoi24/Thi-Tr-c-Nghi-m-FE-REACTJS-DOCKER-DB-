import _ from "lodash";
import { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { toast } from "react-toastify";
import { updateUserProfile } from "../../Service/Profile";
import { set } from "nprogress";
import { useDispatch } from "react-redux";
import { UserChangeManegement } from "../../../Redux/Action/userAction";

const UserInformaiton = (props) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [base64String, setBase64String] = useState("");
  let dispatch = useDispatch();
  const { account } = props;
  useEffect(() => {
    if (!_.isEmpty(account)) {
      setEmail(account.email);
      setRole(account.role);
      setUsername(account.username);
      setImage(account.image);
      setImages(base64ToFile(`data:image/jpeg;base64,${account.image}`));
    }
  }, [account]);

  const handleSaveProfile = async () => {
    if (!username) {
      toast.error("username isEmpty");
      return;
    }

    let res = await updateUserProfile(username, images);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      console.log(image);
      dispatch(
        UserChangeManegement({
          username,
          images: base64String,
        })
      );
    }
  };
  const base64ToFile = (base64, filename) => {
    if (!base64) return null;
    const arr = base64.split(",");
    if (arr.length !== 2) return null;
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };
  const handleImageChange = (e) => {
    if (e.target && e.target.value && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setImages(e.target.files[0]);
      console.log(e.target.files[0]);
      console.log(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setBase64String(base64String);
        setImage(reader.result);
        setImage(base64String);
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      //   setImage(null);
    }
  };
  return (
    <>
      {" "}
      <div className="row">
        <div className="mb-3 col-4">
          <label htmlFor="exampleInput" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="exampleInput" className="form-label">
            Email
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div className="mb-3 col-4">
          <label htmlFor="exampleInput" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            disabled
          />
        </div>
      </div>
      <div>
        {" "}
        <Row className="col-3 mb-3">
          <Form.Group controlId="formGridImage">
            <label className="btn " htmlFor="lableUp">
              {" "}
              <i className="lni lni-circle-plus"></i>
              <span>Upload file</span>
            </label>

            <div className="custom-file">
              <Form.Control
                id="lableUp"
                type="file"
                className="custom-file-input"
                hidden
                onChange={handleImageChange}
              />
            </div>
          </Form.Group>
        </Row>
        {image && (
          <Row className="col-3 mb-3">
            <Image src={`data:image/jpeg;base64,${image}`} thumbnail />
          </Row>
        )}
      </div>
      <div>
        <button
          className=" btn btn-warning"
          onClick={() => handleSaveProfile()}
        >
          {" "}
          Update
        </button>
      </div>
    </>
  );
};

export default UserInformaiton;
