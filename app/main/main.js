import { loadingOff, loadingOn } from "../controllers/loading.js";
import {
  layThongTinTuForm,
  renderDSNV,
  resetForm,
} from "../controllers/nhanVienController.js";
import NhanVien from "../models/nhanVienModel.js";
import { checkDupEmail, checkTK, isValidate } from "../models/validation.js";

const BASE_URL = "https://6256c3326ea70370053ee7bb.mockapi.io";
export let DSNV = [];

// Render Danh sách nhân viên từ API
const renderNVService = () => {
  loadingOn();

  axios({
    url: BASE_URL + "/nhan_vien",
    method: "GET",
  })
    .then((res) => {
      //   console.log(res.data);
      DSNV = res.data;

      document.getElementById("searchName").value = "";

      renderDSNV(DSNV);

      loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingOff();
    });

  // console.log(DSNV);
};
// End

renderNVService();

// Xoá nhân viên
const xoaNV = (id) => {
  loadingOn();

  axios({
    url: BASE_URL + `/nhan_vien/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      console.log("success");

      renderNVService();
      loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingOff();
    });
};

window.xoaNV = xoaNV;
// End

// Thêm người dùng mới
document.getElementById("btnThemNV").addEventListener("click", () => {
  const duLieuNV = layThongTinTuForm();
  // console.log(duLieuNV);

  document.getElementById("btnThemNV").removeAttribute("data-dismiss", "modal");

  if (
    checkTK(duLieuNV.account) & isValidate(duLieuNV)
    //checkDupEmail(duLieuNV.email)
  ) {
    console.log("yes");
  } else {
    console.log("no");
  }
  if (
    checkTK(duLieuNV.account) &
    isValidate(duLieuNV) &
    checkDupEmail(duLieuNV.email)
  ) {
    const nv = new NhanVien(
      duLieuNV.account,
      duLieuNV.name,
      duLieuNV.email,
      duLieuNV.password,
      duLieuNV.workDate,
      duLieuNV.baseSalary,
      duLieuNV.position,
      duLieuNV.workTime
    );
    console.log(nv);

    document.getElementById("btnThemNV").setAttribute("data-dismiss", "modal");

    loadingOn();

    axios({
      url: BASE_URL + "/nhan_vien",
      method: "POST",
      data: nv,
    })
      .then((res) => {
        console.log("success");

        renderNVService();
        loadingOff();
      })
      .catch((err) => {
        console.log(err);
        loadingOff();
      });

    resetForm();
  }
});
// End

// Cập nhật nhân viên
const btnCapNhatNV = (id) => {
  document.getElementById("tknv").disabled = true;

  axios({
    url: BASE_URL + `/nhan_vien/${id}`,
    method: "GET",
  })
    .then((res) => {
      const nv = res.data;
      // console.log(nv);

      document.getElementById("tknv").value = nv.account;
      document.getElementById("name").value = nv.name;
      document.getElementById("email").value = nv.email;
      document.getElementById("password").value = nv.password;
      document.getElementById("datepicker").value = Intl.DateTimeFormat(
        "en-US",
        {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }
      ).format(new Date(nv.workDate));
      document.getElementById("luongCB").value = nv.baseSalary;
      document.getElementById("chucvu").value = nv.position;
      document.getElementById("gioLam").value = nv.workTime;
    })
    .catch((err) => {
      console.log(err);
    });
};

window.btnCapNhatNV = btnCapNhatNV;

document.getElementById("btnCapNhat").addEventListener("click", () => {
  const duLieuCapNhat = layThongTinTuForm();

  document
    .getElementById("btnCapNhat")
    .removeAttribute("data-dismiss", "modal");

  if (isValidate(duLieuCapNhat)) {
    const id = DSNV.find((val) => val.account == duLieuCapNhat.account).id;
    // console.log(id);

    const nv = new NhanVien(
      duLieuCapNhat.account,
      duLieuCapNhat.name,
      duLieuCapNhat.email,
      duLieuCapNhat.password,
      duLieuCapNhat.workDate,
      duLieuCapNhat.baseSalary,
      duLieuCapNhat.position,
      duLieuCapNhat.workTime
    );

    document.getElementById("btnCapNhat").setAttribute("data-dismiss", "modal");

    loadingOn();

    axios({
      url: BASE_URL + `/nhan_vien/${id}`,
      method: "PUT",
      data: nv,
    })
      .then((res) => {
        console.log(res.data);

        renderNVService();
        loadingOff();
      })
      .catch((err) => {
        console.log(err);
        loadingOff();
      });

    resetForm();
  }
});
// End

// Reset form khi click nút đóng
document.getElementById("btnDong").addEventListener("click", () => {
  resetForm();
});
// End

// Tìm nhân viên theo loại
document.getElementById("searchName").addEventListener("keyup", () => {
  const duLieuTimKiem = document.getElementById("searchName").value;
  // console.log(duLieuTimKiem);

  if (duLieuTimKiem.length == 0) {
    renderDSNV(DSNV);
  } else {
    const dsnvTimKiem = DSNV.filter((val) =>
      val.rank.toLowerCase().includes(duLieuTimKiem.toLowerCase())
    );
    // console.log(dsnvTimKiem);

    if (dsnvTimKiem.length > 0) {
      renderDSNV(dsnvTimKiem);
    } else {
      document.getElementById("tableDanhSach").innerHTML = "";
    }
  }
});
// End
