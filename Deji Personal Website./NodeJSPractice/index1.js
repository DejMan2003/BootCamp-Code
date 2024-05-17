import nodeM from "nodemailer";
const node = nodeM();

const transporter = nodeM.createTransport(
{
 host : process.env.email, 
port : '465',
secure: true,
auth:
{
  user: process.env.email,
  password : process.env.password,
},
}
);

async function main() {

  const info = await transporter.sendMail(
  {
  from : '"Deji " ayodejionawunmi@yahoo.com ',
  to: ["dejionawunmi@gmail.com", ], 
  });

}
const email = "";
const password = "";
