class NhanVien {
  constructor(
    _account,
    _name,
    _email,
    _password,
    _workDate,
    _baseSalary,
    _position,
    _workTime
  ) {
    this.account = _account;
    this.name = _name;
    this.email = _email;
    this.password = _password;
    this.workDate = _workDate;
    this.baseSalary = Number(_baseSalary.replaceAll(/\D/g, ""));
    this.position = _position;
    this.workTime = Number(_workTime.replaceAll(/\D/g, ""));
    this.totalSalary = this.tinhTongLuong();
    this.rank = this.xepLoaiNV();
  }

  tinhTongLuong() {
    if (this.position == "Giám đốc") {
      return this.baseSalary * 3;
    } else if (this.position == "Trưởng phòng") {
      return this.baseSalary * 2;
    } else if (this.position == "Nhân viên") {
      return this.baseSalary;
    } else {
      return 0;
    }
  }

  xepLoaiNV() {
    if (this.workTime >= 192) {
      return "Xuất sắc";
    } else if (this.workTime >= 176) {
      return "Giỏi";
    } else if (this.workTime >= 160) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  }
}

export default NhanVien;
