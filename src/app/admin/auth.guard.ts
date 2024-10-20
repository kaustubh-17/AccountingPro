import { inject } from "@angular/core"
import { LoginService } from "./Services/login.service"
import { Router } from "@angular/router";

export const CanActivateFn = () => {
    const loginService = inject(LoginService);
    const router = inject(Router);
    if (loginService.isAuthenticated()) {
        return true;
    } else {
        alert("You're not logged in. Login first.");
        router.navigate(['/login']);
        return false;
    }
}

export const CanActivateChildFn = () => {
    return CanActivateFn;
}

export interface IDeactivateComponentFn {
    canExit(): boolean;
}
export const CanDeactivateFn = (component : IDeactivateComponentFn) => {
    return component.canExit();
}

export const GetUser = () => {
    
    let storedUser = localStorage.getItem('currentUser');
    if (storedUser != null && storedUser != undefined)
        {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser) {
              return parsedUser;
            } 
        }
    return null;
}


export const GetDepartment = () => {
    
    let storedUser = localStorage.getItem('currentUser');
    if (storedUser != null && storedUser != undefined)
        {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser && parsedUser.emp_department) {
              return parsedUser.emp_department;
            } 
        }
    return null;
}

export const CanActivateHRFn = () => {
   // console.log(GetDepartment());
    if (CanActivateFn() && GetDepartment() === 'HR' ) {
        return true;
    }
    return false;
}

export const CanActivateFinanceFn = () => {
    // Succeeded - console.log(GetDepartment());
    if (CanActivateFn() && GetDepartment() === 'Finance' ) {
        return true;
    }
    return false;
}

export const CanActivateITFn = () => {
    //console.log(GetDepartment());
    if (CanActivateFn() && GetDepartment() === 'IT' ) {
        return true;
    }
    return false;
}