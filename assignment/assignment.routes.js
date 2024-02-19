'use strict'
import { Router } from "express"
import { validateJwt, isAdmin } from "../src/middlewares/validate.jwt"
import { createCourse } from "../src/course/course.controller"