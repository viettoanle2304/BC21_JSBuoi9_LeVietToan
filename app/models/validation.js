import { DSNV } from "../main/main.js";

// Kiểm tra tài khoản nhập vào
export const checkTK = (accountNV) => {
  // Điều kiện đúng: Gồm 4-6 kí số (không chứa kí tự), và không để rỗng
  if (accountNV.length < 4 || accountNV.length > 6 || isNaN(accountNV)) {
    document.getElementById("tknv").style = "border-color: red";
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML =
      "Tài khoản gồm 4-6 kí số, không để trống";

    return false;
  }

  //   Điều kiện đủ: Không bị trùng
  if (DSNV.filter((nv) => nv.account == accountNV) != 0) {
    document.getElementById("tknv").style = "border-color: red";
    document.getElementById("tbTKNV").style.display = "block";
    document.getElementById("tbTKNV").innerHTML = "Tài khoản đã tồn tại";

    return false;
  }

  document.getElementById("tknv").style = "border-color: #ced4da";
  document.getElementById("tbTKNV").style.display = "none";

  return true;
};
// End

// Kiểm tra tên nhân viên
const checkTenNV = (tenNV) => {
  // Điều kiện đúng: Tên không chứa số và không để rỗng
  if (tenNV.match(/[0-9]/g) != null || tenNV.length == 0) {
    document.getElementById("name").style = "border-color: red";
    document.getElementById("tbTen").style.display = "block";
    document.getElementById("tbTen").innerHTML =
      "Tên nhân viên phải là chữ, không để trống";

    return false;
  }

  document.getElementById("name").style = "border-color: #ced4da";
  document.getElementById("tbTen").style.display = "none";

  return true;
};
// End

// Kiểm tra email
const checkEmail = (emailNV) => {
  // Điều kiện đúng: Email phải đúng định dạng và không để rỗng
  if (
    !emailNV
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) ||
    emailNV.length == 0
  ) {
    document.getElementById("email").style = "border-color: red";
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML =
      "Email phải đúng định dạng, không để trống";

    return false;
  }

  document.getElementById("email").style = "border-color: #ced4da";
  document.getElementById("tbEmail").style.display = "none";

  return true;
};

//   Điều kiện bổ sung cho thêm mới: Email không bị trùng
export const checkDupEmail = (emailNV) => {
  if (DSNV.filter((nv) => nv.email == emailNV).length != 0) {
    document.getElementById("email").style = "border-color: red";
    document.getElementById("tbEmail").style.display = "block";
    document.getElementById("tbEmail").innerHTML = "Email đã tồn tại";

    return false;
  }

  return true;
};
// End

// Kiểm tra ngày làm
const checkMatKhau = (mkNV) => {
  // Điều kiện đúng: 6-10 kí tự, không để trống
  if (mkNV.length < 6 || mkNV.length > 10) {
    document.getElementById("password").style = "border-color: red";
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu tối đa 6-10 ký tự, không để trống";

    return false;
  }
  //   console.log(mkNV);

  // Điều kiện đủ: Chứa ít nhất 1 ký tự số, 1 kí tự in hoa, 1 kí tự đặc biệt
  if (
    mkNV.match(/[0-9]/g) == null ||
    mkNV.match(/[A-Z]/g) == null ||
    mkNV.match(/[\W\_]/g) == null
  ) {
    document.getElementById("password").style = "border-color: red";
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu chứa ít nhất 1 ký tự số, 1 ký tự in hoa và 1 ký tự đặc biệt";

    return false;
  }

  // Điều kiện bổ sung: Không chứa khoảng trắng
  if (mkNV.match(/\s/g) != null) {
    document.getElementById("password").style = "border-color: red";
    document.getElementById("tbMatKhau").style.display = "block";
    document.getElementById("tbMatKhau").innerHTML =
      "Mật khẩu không được chứa khoảng trắng";

    return false;
  }

  document.getElementById("password").style = "border-color: #ced4da";
  document.getElementById("tbMatKhau").style.display = "none";

  return true;
};
// End

// Kiểm tra ngày làm
const checkNgayLam = (ngayLamNV) => {
  //   console.log(ngayLamNV);

  // Điều kiện đúng: Không để trống, định dạng mm/dd/yyyy
  if (ngayLamNV.length == 0) {
    document.getElementById("datepicker").style = "boder-color: red";
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm không được để trống, định dạng mm/dd/yyyy";

    return false;
  }

  // Điều kiện đủ: Đúng định dạng mm/dd/yyyy
  if (
    ngayLamNV.slice(0, ngayLamNV.indexOf("/")).length > 2 ||
    ngayLamNV.slice(ngayLamNV.lastIndexOf("/") + 1) < 4 ||
    new Date(ngayLamNV).toDateString() == "Invalid Date"
  ) {
    document.getElementById("datepicker").style = "boder-color: red";
    document.getElementById("tbNgay").style.display = "block";
    document.getElementById("tbNgay").innerHTML =
      "Ngày làm sai định dạng, định dạng đúng mm/dd/yyyy";

    return false;
  }

  document.getElementById("datepicker").style = "boder-color: #ced4da";
  document.getElementById("tbNgay").style.display = "none";

  return true;
};
// End

// Kiểm tra lương cơ bản
const checkLuongCB = (luongCBNV) => {
  // Điều kiện đúng: Là số (chấp nhận: 1000000, 1 000 000, 1.000.000, hoặc 1,000,000), không để trống
  if (luongCBNV.match(/[^\d\s.,]/g) != null || luongCBNV.length == 0) {
    document.getElementById("luongCB").style = "border-color: red";
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản phải là số, không để trống";

    return false;
  }

  //   console.log(Number(luongCBNV.replaceAll(/[\s,.]/g, "")));

  // Điều kiện đủ: Giá trị từ 1 000 000 đến 20 000 000
  if (
    Number(luongCBNV.replaceAll(/[\s,.]/g, "")) < 1000000 ||
    Number(luongCBNV.replaceAll(/[\s,.]/g, "")) > 20000000
  ) {
    document.getElementById("luongCB").style = "border-color: red";
    document.getElementById("tbLuongCB").style.display = "block";
    document.getElementById("tbLuongCB").innerHTML =
      "Lương cơ bản tối đa 1 000 000 - 20 000 000";

    return false;
  }

  document.getElementById("luongCB").style = "border-color: #ced4da";
  document.getElementById("tbLuongCB").style.display = "none";

  return true;
};
// End

// Kiểm tra chức vụ
const checkChucVu = (chucVuNV) => {
  //   console.log(chucVuNV);

  // Điều kiện đúng: Chức vụ được chọn hợp lệ
  if (
    chucVuNV != "Giám đốc" &&
    chucVuNV != "Trưởng phòng" &&
    chucVuNV != "Nhân viên"
  ) {
    document.getElementById("chucvu").style = "border-color: red";
    document.getElementById("tbChucVu").style.display = "block";
    document.getElementById("tbChucVu").innerHTML =
      "Vui lòng chọn chức vụ nhân viên hợp lệ";

    return false;
  }

  document.getElementById("chucvu").style = "border-color: #ced4da";
  document.getElementById("tbChucVu").style.display = "none";

  return true;
};
// End

// Kiểm tra giờ làm
const checkGioLam = (gioLamNV) => {
  // Điều kiện đúng: Là số (chấp nhận float), không được để trống
  if (gioLamNV.length == 0 || isNaN(gioLamNV)) {
    document.getElementById("gioLam").style = "border-color: red";
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm phải là số, không được để trống";

    return false;
  }

  // Điều kiện đủ: Giá trị từ 80 đến 200
  if (Number(gioLamNV) < 80 || Number(gioLamNV) > 200) {
    document.getElementById("gioLam").style = "border-color: red";
    document.getElementById("tbGiolam").style.display = "block";
    document.getElementById("tbGiolam").innerHTML =
      "Giờ làm tối đa 80 - 200 giờ";

    return false;
  }

  document.getElementById("gioLam").style = "border-color: #ced4da";
  document.getElementById("tbGiolam").style.display = "none";

  return true;
};
// End

export const isValidate = (nv) => {
  if (
    checkTenNV(nv.name) &
    checkEmail(nv.email) &
    checkMatKhau(nv.password) &
    checkNgayLam(nv.workDate) &
    checkLuongCB(nv.baseSalary) &
    checkChucVu(nv.position) &
    checkGioLam(nv.workTime)
  ) {
    return true;
  }

  return false;
};
