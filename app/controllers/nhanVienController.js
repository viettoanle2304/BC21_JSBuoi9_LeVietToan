import { isValidate } from "../models/validation.js";

// Tạo bảng in ra nhân viên
export const renderDSNV = (arr) => {
  let contentHtml = "";

  arr.forEach((item) => {
    const contentTr =
      // html
      `
        <tr>
            <td>${item.account}</td>
            <td>${item.name}</td>
            <td>${item.email}</td>
            <td>${item.workDate.slice(0, 10)}</td>
            <td>${item.position}</td>
            <td>${item.totalSalary.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}</td>
            <td>${item.rank}</td>
            <td>
                <button id="btnSua" class="btn btn-success mb-1"
                onclick="btnCapNhatNV(${item.id})" 
                data-toggle="modal"
                data-target="#myModal">Sửa</button>
                <button class="btn btn-danger" onclick="xoaNV(${
                  item.id
                })">Xoá</button>
            </td>
        </tr>
    `;

    contentHtml += contentTr;

    document.getElementById("tableDanhSach").innerHTML = contentHtml;
  });
};
// End

// Lấy thông tin nhân viên được nhập vào từ form
export const layThongTinTuForm = () => {
  const account = document.getElementById("tknv").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const workDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(document.getElementById("datepicker").value));
  const baseSalary = document.getElementById("luongCB").value;
  const position = document.getElementById("chucvu").value;
  const workTime = document.getElementById("gioLam").value;

  return {
    account,
    name,
    email,
    password,
    workDate,
    baseSalary,
    position,
    workTime,
  };
};
// End

// Clear Form sau khi đã thêm (sửa)
export const resetForm = () => {
  document.getElementById("tknv").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("datepicker").value = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  document.getElementById("luongCB").value = "";
  document.getElementById("chucvu").selectedIndex = 0;
  document.getElementById("gioLam").value = "";

  document.getElementById("tknv").style = "border-color: #ced4da";
  document.getElementById("tbTKNV").style.display = "none";
  document.getElementById("name").style = "border-color: #ced4da";
  document.getElementById("tbTen").style.display = "none";
  document.getElementById("email").style = "border-color: #ced4da";
  document.getElementById("tbEmail").style.display = "none";
  document.getElementById("password").style = "border-color: #ced4da";
  document.getElementById("tbMatKhau").style.display = "none";
  document.getElementById("datepicker").style = "boder-color: #ced4da";
  document.getElementById("tbNgay").style.display = "none";
  document.getElementById("luongCB").style = "border-color: #ced4da";
  document.getElementById("tbLuongCB").style.display = "none";
  document.getElementById("chucvu").style = "border-color: #ced4da";
  document.getElementById("tbChucVu").style.display = "none";
  document.getElementById("gioLam").style = "border-color: #ced4da";
  document.getElementById("tbGiolam").style.display = "none";
};
// End

document.getElementById("btnThem").addEventListener("click", () => {
  document.getElementById("tknv").disabled = false;
});
