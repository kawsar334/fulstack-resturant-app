
import "./userlist.css";


import {Link} from "react-router-dom"



const UserList = () => {
  return (
    <div className="userList" >
      <Link to="/newuser" className="btn  addbtn">
        Add new user
      </Link>
      <table class="table table-light border ">
        <thead>
          <tr >
            <th scope="col" className="text-center">Id</th>
            <th scope="col" className="text-center">User</th>
            <th scope="col" className="text-center">Email</th>
            <th scope="col" className="text-center">Handle</th>
            <th scope="col" className="text-center">Transaction</th>
            <th scope="col" className="text-center" colSpan={2}>action</th>
          </tr>
        </thead>
        <tbody>
          {/*  */}
          <tr>
            <th scope="row">1</th>
            <td><img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="userIgm" /> <span>kawsar firoz</span></td>
            <td>kawsarfiroz@gmail.com</td>
            <td>Active</td>
            <td className="userTrasaction">$120.00</td>
            <td><a href="/user/id"  className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          {/*  */}
          {/*  */}
          <tr>
            <th scope="row">2</th>
            <td><img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="userIgm" /> <span>kawsar firoz</span></td>
            <td>kawsarfiroz@gmail.com</td>
            <td>Active</td>
            <td className="userTrasaction">$120.00</td>
            <td><a href="/user/id" className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          {/*  */}

          {/*  */}
          <tr>
            <th scope="row">3</th>
            <td><img src="https://cdn.dribbble.com/users/5031392/screenshots/15467520/media/c36b3b15b25b1e190d081abdbbf947cf.png?compress=1&resize=1200x900" alt="" className="userIgm" /> <span>kawsar firoz</span></td>
            <td>kawsarfiroz@gmail.com</td>
            <td>Active</td>
            <td className="userTrasaction">$120.00</td>
            <td><a href="/user/id" className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          {/*  */}
          {/*  */}
          <tr>
            <th scope="row">4</th>
            <td><img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="userIgm" /> <span>kawsar firoz</span></td>
            <td>kawsarfiroz@gmail.com</td>
            <td>Active</td>
            <td className="userTrasaction">$120.00</td>
            <td><a href="/user/id" className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          {/*  */}
          {/*  */}
          <tr>
            <th scope="row">5</th>
            <td><img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="userIgm" /> <span>kawsar firoz</span></td>
            <td>kawsarfiroz@gmail.com</td>
            <td>Active</td>
            <td className="userTrasaction">$120.00</td>
            <td><a href="/user/id" className="btn btn-primary mx-1"><i class="fa-regular fa-pen-to-square"></i></a>
              <button className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
          {/*  */}
          
         
        </tbody>
      </table>
     
    </div>
  )
}

export default UserList