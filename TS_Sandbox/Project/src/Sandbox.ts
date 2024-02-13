function printGeneric<T>(value: T): void {
  console.log(typeof value);
  console.log(value);
}

printGeneric("this is a string");
printGeneric(1);

printGeneric<string>("whaaat");

// abstract class EmployeeBase {
//   abstract doWork(): void;
//   constructor(public id: number, public name: string) {}
// }

// class OfficeWorker extends EmployeeBase {
//   doWork(): void {
//     console.log(`${this.name} doing some work`);
//   }
// }

// class OfficeManager extends OfficeWorker {
//   public employees: OfficeWorker[] = [];
//   manageEmployees() {
//     super.doWork();
//     this.employees.forEach((employee) => {
//       employee.doWork();
//     });
//   }
// }

// let joeBlogg = new OfficeWorker(1, "Joe");
// let jillBlogg = new OfficeWorker(2, "Jill");
// let jackManager = new OfficeManager(3, "Jack");

// jackManager.employees.push(joeBlogg);
// jackManager.employees.push(jillBlogg);

// jackManager.manageEmployees();
