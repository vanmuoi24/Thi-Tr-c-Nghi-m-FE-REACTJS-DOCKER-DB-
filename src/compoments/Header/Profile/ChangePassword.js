import { t } from "i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import { ChangePassWord } from "../../Service/Profile";

const ChangePassword = () => {
  const [CurrentPass, setCurrentPass] = useState("");
  const [NewPass, setNewPass] = useState("");
  const [ConFirm, setConFirm] = useState("");
  const handleUpdate = async () => {
    if (!CurrentPass) {
      toast.error("Current PassWord isEmpty");
      return;
    }
    if (!NewPass) {
      toast.error("NewPass PassWord isEmpty");
      return;
    }
    if (!ConFirm) {
      toast.error("ConFirm PassWord isEmpty");
      return;
    }

    if (NewPass !== ConFirm) {
      toast.error("Please enter Correct");
      return;
    }
    let res = await ChangePassWord(CurrentPass, NewPass);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <div className="row">
        <div className="mb-3 col-6">
          <label htmlFor="exampleInput" className="form-label">
            Current PassWord
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={CurrentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInput" className="form-label">
            New PassWord
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={NewPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="exampleInput" className="form-label">
            Confrim Password
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInput"
            value={ConFirm}
            onChange={(e) => setConFirm(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button className="btn btn-warning" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </>
  );
};

export default ChangePassword;
