

TypeScript: 

// 1- TypeScript: it is a superset of javascript that add static typing, helping to catch errors at compile time 
// making large codobases to mantain.

// 2- Type: it is an alias that can represent primitives, objects, unions, intersections, and more

	type ID = number | string;

	let userId: ID = 123;
    let productId: ID = "abc-123";
	
	
// 3- Listas:	It is a data structure with multiple values
	
	// 3-A Lista de string
	let listaTares: string[] = ["Tarea 1", "Tarea 2"];

	// 3-B Union type: A union type allows a variable to hold multiple possible types.
	//Lista con 'Any'
	let valores = [false, "Hola", true, 56]

    // 3-C Tuple: A tuple is a fixed-length array with fixed types.
	//Lista con diferentes tipos de datos
	let valores_tipo_dato: (string | number | boolean)[] = [false, "Hola", true, 56];
	let user: [string, number] = ["Renzo", 30];
	
	//Example:  
	let users: string[] = ["Juan", "Maria", "Pedro"];

	for (let user of users) {
	  console.log(user);
	}
	
	valores.forEach((valor) => {
	  console.log(valor);
	});
	
	for (let i = 0; i < valores.length; i++) {
	  console.log(valores[i]);
	}
	
	//Example 2
	// Asignación múltiples de variables

	let miTarea = {
		titulo: 'Mi tarea',
		estado: Estados.Completado,
		urgencia: 1
	}

	// Declaración 1 a 1
	let miTitulo = miTarea.titulo;
	let miEstado = miTarea.estado;
	let miUrgencia = miTarea.urgencia;

// 4- Enum: An enum (enumeration) is a special TypeScript, it is a set of named constant values.

	
	enum Estados {
		"Completado" = "C",
		"Incompleto" = "I",
		"Pendinte" = "P"
	}

// 5- Interface: it is structure that an object or class must follow

	interface Tarea {
		nombre: string,
		estado: Estados,
		urgencia: number
	}

	// Podemos crear variables que sigan la interface Tarea. (Es como instanciar un objeto)

	let tarea1: Tarea = {
		nombre: "Tarea 1",
		estado: Estados.Pendinte,
		urgencia: 10
	}
	
// 6- What is the difference between const and readonly?

const prevents reassignment of a variable. readonly prevents modification of an object property.

// 7- Swith

switch (tarea1.estado) {
    case Estados.Completado:
        console.log("La tarea está completada");
        break;
	default:
	    console.log("Default");
		break;
};
		
// 8 - What is the Non-null Assertion Operator (!)?: Tells TypeScript a value will not be null or undefined.
let el!: HTMLElement;


// 9 - Funciones

	// 9A -  Normal function
	function saludar() {
	function saludarPersona(nombre: string) {

	// 9B - Optional params:
	function despedidaOpcional(nombre?: string)
	
	// 9B - Param with default value
	function saludarPersona(nombre: string) {
		
	// 9C - Multiple params
	function variosParams(nombre: string, apellidos?: string, edad: number = 18)
	
	// 9D - Puede recibir un parámetro en este caso de tipo string o number
	function ejemploVariosTipos(a: string | number)
	
	// 9E - ...nombres: de esta forma se indica que la funcion puede recibir varios param o no recibir nada
	function ejemploMultiParam(...nombres: string[]): void {
		nombres.forEach((nombre) => {
				console.log(nombre);
		});
	}
	ejemploMultiParam("Renzo", "Pepe", "Juan");
	
	// 9F - ARROW Functions

	// Objeto con propiedades para ser instanciada
	type Empleado {
		nombre: string
		apellidos: string
		edad: number
	}

	let empleadoRenzo: Empleado = {
		nombre: "Renzo",
		apellidos: "Perrini",
		edad: 32
	}

// 10 - Diferencias entre var, let, const
	var is function-scoped, can be redeclared and reassigned, and is hoisted and initialized as undefined.

	var x = 1;
	var x = 2; // allowed

   //-----
   let is block-scoped, cannot be redeclared in the same scope, but can be reassigned.
   
   let x = 1;
   x = 2; // allowed
   
   //-----
   const is block-scoped, cannot be redeclared or reassigned. It must be initialized at declaration time.
   
   const x = 1;
   x = 2; // ❌ error
   
   const user = { name: "Renzo" };
   user.name = "Juan"; // ✅ allowed
   
   Interview Summary:

    var → function scoped, unsafe, avoid
	let → block scoped, reassignable
	const → block scoped, not reassignable
	
// 11 - Diferencias entre type and interface
	
	// 11A - Interface: An interface defines the shape of an object or class. Can be extended
	
	interface User {
	  name: string;
	  age: number;
	}
	
	// 11B - type is a type alias. It is more flexible and can represent: Ojects, unions, primitives, tuples, intersections.

	type ID = number | string;
	type User = {
	  name: string;
	  age: number;
	};
	
	/* Diferences: interface is mainly for object shapes and contracts
	type is more flexible and can represent unions and primitives
	interface supports declaration merging
	type does not */