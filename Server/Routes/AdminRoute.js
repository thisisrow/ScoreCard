import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import { Console } from "console";


const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const tableName = req.body.category; 
    const addCategorySQL = "INSERT INTO category (`name`) VALUES (?) ";
    const createTableSQL = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), run INT, wicket INT, run4 INT, run6 INT, role VARCHAR(50))`;
    
    
    con.query(addCategorySQL, [tableName], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" });
        }
    con.query(createTableSQL, (err, result) => {
            if (err) {
                return res.json({ Status: false, Error: "Query Error" });
            }
            
            return res.json({ Status: true });
        });
    });
});


//regester

router.post('/player_team', (req, res) => {
    const { category, name, role } = req.body;
    const sql = `INSERT INTO \`${category}\` (name,role) VALUE (?,?)`;
    con.query(sql, [name, role], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

router.get('/sport', (req, res) => {
    const sql = "SELECT * FROM sport";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_sport', (req, res) => {
    const sql = "INSERT INTO sport (`name`) VALUES (?)"
    con.query(sql, [req.body.sport], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})


// end imag eupload 

router.post('/add_employee', (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary, category_id,sport_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.body.category_id,
            req.body.sport_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})


router.get('/employee', (req, res) => {
    const sql = `SELECT
         e.id AS employee_id,
         e.name AS employee_name,
         e.email,
         e.salary,
         e.address,
         c.name AS category_name,
         s.name AS sport_name
     FROM
         employee e
     LEFT JOIN
         category c ON e.category_id = c.id
     LEFT JOIN
         sport s ON e.sport_id = s.id`;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})



router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ?,sport_id
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
        req.body.sport_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})



router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/player_count/:team_name', (req, res) => {
    const {team_name}=req.params;
    const sql = `select count(id) as employee from ${team_name}`;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})



//explor of team score 
  
router.get('/team/:team_name', (req, res) => {
    const {team_name} = req.params;
    const sql = `SELECT * FROM ${team_name} ORDER BY run DESC`;
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})
router.get('/edit_team_player/:employeeId', (req, res) => {
    const id = req.params.employeeId;
    const {category} = req.query;
    const sql = `SELECT * FROM ${category} WHERE id = ${id}`;
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_team_player/:employeeId', (req, res) => {
    const id = req.params.employeeId;
    const { category } = req.query;
    const sql = `UPDATE ${category} 
        SET name = ?, run = ?, wicket = ?, run4 = ?, run6 = ?, role = ?
        WHERE id = ?`;
    const values = [
        req.body.name,
        req.body.run,
        req.body.wicket,
        req.body.run4,
        req.body.run6,
        req.body.role,
        id
    ];
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err });
        return res.json({ Status: true, Result: result });
    });
});

router.delete('/edit_team_player/:employeeId', (req, res) => {
    const id = req.params.employeeId;
    const { category } = req.query;
    const sql = `delete from ${ category } where id = ?`
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
