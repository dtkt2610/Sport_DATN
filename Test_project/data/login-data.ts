export interface LoginTestCase {
  id: string;
  description: string;
  email: string;
  password: string;
  expected: string;
}

export const LoginData: LoginTestCase[] = [
  {
    id: "LOGIN01",
    description: 'Điều hướng tới trang đăng nhập',
    email: '',
    password: '',
    expected: ''
  },
  {
    id: "LOGIN02",
    description: 'Đăng nhập thành công',
    email: 'thoadinh@yopmail.com',
    password: 'kimthoa2003',
    expected: 'Đăng nhập thành công'
  },
  {
    id: "LOGIN03",
    description: 'Đăng nhập thất bại - Tài khoản chưa tồn tại',
    email: 'user@example.com',
    password: 'wrongpassword',
    expected: 'Sai tài khoản hoặc mật khẩu'
  },
  {
    id: "LOGIN04",
    description: 'Đăng nhập thất bại - Để trống ô email',
    email: '',
    password: 'kimthoa2003',
    expected: 'Sai tài khoản hoặc mật khẩu'
  },
  {
    id: "LOGIN05",
    description: 'Đăng nhập thất bại - Để trống ô mật khẩu',
    email: 'thoadinh@yopmail.com',
    password: '',
    expected: 'Sai tài khoản hoặc mật khẩu'
  },
  {
    id: "LOGIN06",
    description: 'Đăng nhập thất bại - Nhập email sai',
    email: 'user@example.com',
    password: 'kimthoa2003',
    expected: 'Sai tài khoản hoặc mật khẩu'
  },
  {
    id: "LOGIN07",
    description: 'Đăng nhập thất bại - Nhập mật khẩu sai',
    email: 'thoadinh@yopmail.com',
    password: 'wrongpassword',
    expected: 'Sai tài khoản hoặc mật khẩu'
  },
]