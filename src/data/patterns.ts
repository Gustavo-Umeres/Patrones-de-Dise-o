export interface ComponentInfo {
  clase: string;
  responsabilidad: string;
}

export interface Advantage {
  titulo: string;
  descripcion: string;
}

export interface Disadvantage {
  titulo: string;
  descripcion: string;
}

export interface Pattern {
  id: string;
  name: string;
  englishName: string;
  concept: {
    definicion: string;
    ideaCentral: string;
    problema: string;
    cuandoUsar: string[];
    analogia: string;
  };
  uml: string;
  components: ComponentInfo[];
  advantages: Advantage[];
  disadvantages: Disadvantage[];
  javaCode: string;
  flow: string;
  realCase: {
    descripcion: string;
    ejemplos: string[];
  };
}

export const PATTERNS: Pattern[] = [
  {
    id: "chain-of-responsibility",
    name: "Chain of Responsibility",
    englishName: "Cadena de Responsabilidad",
    concept: {
      definicion: "Permite pasar solicitudes a lo largo de una cadena de manejadores. Al recibir una solicitud, cada manejador decide procesarla o pasarla al siguiente manejador de la cadena.",
      ideaCentral: "Desacoplar al emisor de una solicitud de sus receptores, dando a más de un objeto la oportunidad de responder a la solicitud de forma secuencial.",
      problema: "En una aplicación con múltiples tipos de solicitudes y procesos de validación (por ejemplo, autenticación, autorización, validación de datos, compresión), escribir todo el código en un único método o clase genera un componente monolítico y difícil de mantener.",
      cuandoUsar: [
        "Cuando tu programa debe procesar diversos tipos de solicitudes de varias formas, pero los tipos exactos de solicitudes y sus secuencias no se conocen de antemano.",
        "Cuando es esencial ejecutar varios manejadores en un orden específico.",
        "Cuando el conjunto de manejadores y su orden deben cambiar dinámicamente durante el tiempo de ejecución."
      ],
      analogia: "Una llamada telefónica de soporte técnico: primero te atiende un robot (Manejador 1). Si no resuelve tu problema, te transfiere a un operador (Manejador 2). Si el operador tampoco puede, te transfiere con un ingeniero especialista (Manejador 3)."
    },
    uml: `classDiagram
    class Handler {
        <<interface>>
        +setNext(handler: Handler) Handler
        +handle(request: String) String
    }
    class BaseHandler {
        <<abstract>>
        -next: Handler
        +setNext(handler: Handler) Handler
        +handle(request: String) String
    }
    class ConcreteHandlerA {
        +handle(request: String) String
    }
    class ConcreteHandlerB {
        +handle(request: String) String
    }
    Handler <|.. BaseHandler
    BaseHandler o-- Handler
    BaseHandler <|-- ConcreteHandlerA
    BaseHandler <|-- ConcreteHandlerB`,
    components: [
      { clase: "Handler (Manejador)", responsabilidad: "Declara la interfaz común para todos los manejadores concretos. Normalmente contiene un método para establecer el siguiente manejador." },
      { clase: "BaseHandler (Manejador Base)", responsabilidad: "Clase opcional abstracta que implementa la relación de encadenamiento y guarda la referencia al siguiente objeto." },
      { clase: "ConcreteHandlers (Manejadores Concretos)", responsabilidad: "Contienen el código real para procesar solicitudes. Al recibir una solicitud, deciden si procesarla y/o pasarla al siguiente." },
      { clase: "Client (Cliente)", responsabilidad: "Configura la cadena inicial y lanza la solicitud al primer manejador de la cadena." }
    ],
    advantages: [
      { titulo: "Principio de Responsabilidad Única", descripcion: "Puedes desacoplar las clases que invocan operaciones de las clases que realizan las operaciones." },
      { titulo: "Principio de Abierto/Cerrado", descripcion: "Puedes introducir nuevos manejadores en la aplicación sin romper el código cliente existente." },
      { titulo: "Control de Flujo Dinámico", descripcion: "Puedes configurar, reordenar o eliminar elementos de la cadena en tiempo de ejecución." }
    ],
    disadvantages: [
      { titulo: "Peticiones no garantizadas", descripcion: "No hay garantía de que la solicitud sea procesada por algún manejador si ninguno de la cadena la maneja." },
      { titulo: "Depuración compleja", descripcion: "Puede ser difícil seguir el flujo y depurar el código cuando la cadena es muy larga." }
    ],
    javaCode: `// 1. Interfaz Handler
public interface Handler {
    void setNext(Handler next);
    void handle(String request, double amount);
}

// 2. Manejador Base
public abstract class BaseHandler implements Handler {
    protected Handler next;

    @Override
    public void setNext(Handler next) {
        this.next = next;
    }

    protected void passToNext(String request, double amount) {
        if (next != null) {
            next.handle(request, amount);
        } else {
            System.out.println("Fin de la cadena: La solicitud '" + request + "' por $" + amount + " no pudo ser procesada.");
        }
    }
}

// 3. Manejadores Concretos
public class Employee extends BaseHandler {
    @Override
    public void handle(String request, double amount) {
        if (amount <= 1000) {
            System.out.println("Empleado aprueba la solicitud '" + request + "' por $" + amount);
        } else {
            System.out.println("Empleado no puede aprobar. Pasando al Supervisor...");
            passToNext(request, amount);
        }
    }
}

public class Supervisor extends BaseHandler {
    @Override
    public void handle(String request, double amount) {
        if (amount <= 5000) {
            System.out.println("Supervisor aprueba la solicitud '" + request + "' por $" + amount);
        } else {
            System.out.println("Supervisor no puede aprobar. Pasando al Gerente...");
            passToNext(request, amount);
        }
    }
}

public class Manager extends BaseHandler {
    @Override
    public void handle(String request, double amount) {
        if (amount <= 20000) {
            System.out.println("Gerente aprueba la solicitud '" + request + "' por $" + amount);
        } else {
            System.out.println("Gerente no puede aprobar. Monto excede los límites permitidos.");
            passToNext(request, amount);
        }
    }
}

// 4. Clase Cliente
public class Main {
    public static void main(String[] args) {
        Handler empleado = new Employee();
        Handler supervisor = new Supervisor();
        Handler gerente = new Manager();

        // Configurar la cadena
        empleado.setNext(supervisor);
        supervisor.setNext(gerente);

        // Enviar peticiones
        System.out.println("--- Petición 1 ---");
        empleado.handle("Compra de papelería", 500);

        System.out.println("\\n--- Petición 2 ---");
        empleado.handle("Laptop de desarrollo", 3500);

        System.out.println("\\n--- Petición 3 ---");
        empleado.handle("Servidor dedicado", 15000);

        System.out.println("\\n--- Petición 4 ---");
        empleado.handle("Campaña de Marketing Gigante", 50000);
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Empleado
    participant Supervisor
    participant Gerente

    Cliente->>Empleado: handle("Compra de Laptop", 3500)
    Note over Empleado: Monto > 1000
    Empleado->>Supervisor: handle("Compra de Laptop", 3500)
    Note over Supervisor: Monto <= 5000 (Aprueba)
    Supervisor-->>Cliente: Petición Aprobada por Supervisor`,
    realCase: {
      descripcion: "Se utiliza ampliamente en el manejo de flujos de red y seguridad.",
      ejemplos: [
        "Middleware de Express.js: Cada middleware es un eslabón que procesa la solicitud HTTP o llama a next() para pasar al siguiente.",
        "Filtros de Seguridad de Spring Security en Java: Autentican, autorizan y validan solicitudes de forma consecutiva.",
        "Manejo de excepciones estructurado (Try-Catch jerárquico)."
      ]
    }
  },
  {
    id: "command",
    name: "Command",
    englishName: "Comando",
    concept: {
      definicion: "Convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud. Esta transformación permite parametrizar métodos con diferentes solicitudes, retrasar o cola la ejecución de una solicitud y soportar operaciones que no se pueden realizar directamente.",
      ideaCentral: "Encapsular una acción o petición como un objeto, lo que permite registrar el historial de acciones, encolarlas y soportar operaciones de deshacer/rehacer (Undo/Redo).",
      problema: "Si la interfaz de usuario invoca directamente la lógica del negocio de los componentes, cambiar el comportamiento de un botón o reutilizar su acción en otro componente (ej. un menú rápido) obliga a duplicar código. Además, es imposible guardar un registro de qué se hizo para dar la opción de deshacer.",
      cuandoUsar: [
        "Cuando quieras parametrizar objetos con acciones.",
        "Cuando quieras programar tareas, encolarlas o ejecutarlas de forma diferida o remota.",
        "Cuando necesites soportar operaciones reversibles (Deshacer/Rehacer)."
      ],
      analogia: "Un mesero en un restaurante: toma tu orden en una libreta (Comando). Esa orden contiene toda la información necesaria. El mesero lleva la orden a la cocina, donde el chef (Receptor) la lee y prepara la comida sin necesidad de conocer al cliente directamente."
    },
    uml: `classDiagram
    class Command {
        <<interface>>
        +execute() void
        +undo() void
    }
    class Light {
        +on() void
        +off() void
    }
    class LightOnCommand {
        -light: Light
        +execute() void
        +undo() void
    }
    class Invoker {
        -command: Command
        +setCommand(command: Command)
        +pressButton() void
    }
    Command <|.. LightOnCommand
    LightOnCommand --> Light
    Invoker --> Command`,
    components: [
      { clase: "Command (Interfaz Comando)", responsabilidad: "Declara el método execute() y, opcionalmente, undo()." },
      { clase: "Concrete Command (Comando Concreto)", responsabilidad: "Implementa el método de ejecución, vinculando una acción con un objeto receptor específico." },
      { clase: "Receiver (Receptor)", responsabilidad: "El objeto que contiene la lógica de negocio real para llevar a cabo la solicitud (quien sabe cómo hacer el trabajo)." },
      { clase: "Invoker (Invocador / Remitente)", responsabilidad: "El objeto que solicita al comando que ejecute la acción. No interactúa directamente con el receptor." }
    ],
    advantages: [
      { titulo: "Bajo acoplamiento", descripcion: "Desacopla la clase que invoca la operación de la clase que sabe cómo realizarla." },
      { titulo: "Composición de comandos", descripcion: "Es fácil ensamblar comandos simples para formar comandos compuestos complejos (Macros)." },
      { titulo: "Undo / Redo incorporado", descripcion: "Facilita la implementación de la función de revertir acciones guardando el estado inverso." }
    ],
    disadvantages: [
      { titulo: "Multiplicación de clases", descripcion: "El código puede complicarse debido a la creación de una gran cantidad de clases nuevas para cada comando." }
    ],
    javaCode: `// 1. Interfaz Command
public interface Command {
    void execute();
    void undo();
}

// 2. Receptor (Receiver)
public class TextEditor {
    private String text = "";

    public void write(String newText) {
        text += newText;
    }

    public void eraseLast(int length) {
        if (text.length() >= length) {
            text = text.substring(0, text.length() - length);
        }
    }

    public String getText() {
        return text;
    }
}

// 3. Comando Concreto
public class WriteCommand implements Command {
    private TextEditor editor;
    private String textToWrite;

    public WriteCommand(TextEditor editor, String textToWrite) {
        this.editor = editor;
        this.textToWrite = textToWrite;
    }

    @Override
    public void execute() {
        editor.write(textToWrite);
    }

    @Override
    public void undo() {
        editor.eraseLast(textToWrite.length());
    }
}

// 4. Invocador (Invoker)
import java.util.Stack;

public class CommandHistory {
    private Stack<Command> history = new Stack<>();

    public void executeCommand(Command cmd) {
        cmd.execute();
        history.push(cmd);
    }

    public void undo() {
        if (!history.isEmpty()) {
            Command cmd = history.pop();
            cmd.undo();
        } else {
            System.out.println("No hay acciones para deshacer.");
        }
    }
}

// 5. Cliente
public class Main {
    public static void main(String[] args) {
        TextEditor editor = new TextEditor();
        CommandHistory history = new CommandHistory();

        System.out.println("Texto inicial: '" + editor.getText() + "'");

        history.executeCommand(new WriteCommand(editor, "Hola "));
        System.out.println("Escribir 1: '" + editor.getText() + "'");

        history.executeCommand(new WriteCommand(editor, "Mundo de Patrones!"));
        System.out.println("Escribir 2: '" + editor.getText() + "'");

        history.undo();
        System.out.println("Deshacer: '" + editor.getText() + "'");

        history.undo();
        System.out.println("Deshacer de nuevo: '" + editor.getText() + "'");
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Invocador
    participant ComandoConcreto
    participant Receptor

    Cliente->>ComandoConcreto: new WriteCommand(editor, "Hola")
    Cliente->>Invocador: executeCommand(comando)
    Invocador->>ComandoConcreto: execute()
    ComandoConcreto->>Receptor: write("Hola")
    Invocador->>Invocador: Guardar comando en historial`,
    realCase: {
      descripcion: "Se utiliza mucho en el diseño de interfaces de usuario y sistemas transaccionales.",
      ejemplos: [
        "Implementación del botón Deshacer/Rehacer (Ctrl+Z / Ctrl+Y) en editores de texto (como VS Code, Microsoft Word).",
        "Sistemas de colas de trabajos en segundo plano (Background Job Queues).",
        "Mapeo de acciones de control en videojuegos (Configuración de botones asignados a comandos)."
      ]
    }
  },
  {
    id: "interpreter",
    name: "Interpreter",
    englishName: "Intérprete",
    concept: {
      definicion: "Dado un lenguaje, define una representación para su gramática junto con un intérprete que utiliza la representación para interpretar sentencias en el lenguaje.",
      ideaCentral: "Crear una jerarquía de clases de expresión para representar reglas gramaticales de un lenguaje simple, permitiendo evaluar oraciones evaluando el árbol de expresiones.",
      problema: "Si un programa debe procesar una cadena que representa operaciones complejas y variables (por ejemplo, fórmulas matemáticas o filtros lógicos ingresados por el usuario), escribir un analizador manual con múltiples sentencias if-else es extremadamente difícil de escalar y depurar.",
      cuandoUsar: [
        "Cuando la gramática del lenguaje es simple y estable.",
        "Cuando la eficiencia no es la principal preocupación (ya que árboles de sintaxis muy grandes consumen mucha memoria y tiempo de procesamiento)."
      ],
      analogia: "Traducción de partituras musicales: Cada nota y símbolo en una partitura representa una instrucción gramatical que un músico (intérprete) sabe leer y ejecutar en su instrumento."
    },
    uml: `classDiagram
    class AbstractExpression {
        <<interface>>
        +interpret(context: Context) int
    }
    class TerminalExpression {
        -value: int
        +interpret(context: Context) int
    }
    class NonTerminalExpression {
        -left: AbstractExpression
        -right: AbstractExpression
        +interpret(context: Context) int
    }
    AbstractExpression <|.. TerminalExpression
    AbstractExpression <|.. NonTerminalExpression
    NonTerminalExpression --> AbstractExpression`,
    components: [
      { clase: "AbstractExpression (Expresión Abstracta)", responsabilidad: "Declara un método abstracto interpret(context) común a todos los nodos del árbol." },
      { clase: "TerminalExpression (Expresión Terminal)", responsabilidad: "Implementa el intérprete asociado con los símbolos terminales de la gramática (como constantes o variables)." },
      { clase: "NonTerminalExpression (Expresión No Terminal)", responsabilidad: "Representa reglas gramaticales complejas (como suma, resta) que combinan otras expresiones secundarias." },
      { clase: "Context (Contexto)", responsabilidad: "Contiene información global o variables accesibles por el intérprete durante la evaluación." }
    ],
    advantages: [
      { titulo: "Fácil modificación", descripcion: "Es fácil cambiar o extender la gramática añadiendo nuevas expresiones sin cambiar las existentes." },
      { titulo: "Implementación sencilla", descripcion: "Facilita la escritura de analizadores sencillos para mini-lenguajes o reglas de negocio." }
    ],
    disadvantages: [
      { titulo: "Rendimiento y Complejidad", descripcion: "Para gramáticas complejas, la jerarquía de clases se vuelve enorme y muy difícil de mantener y evaluar eficientemente." }
    ],
    javaCode: `// 1. Interfaz Expression
public interface Expression {
    int interpret();
}

// 2. Expresión Terminal (Número)
public class NumberExpression implements Expression {
    private int number;

    public NumberExpression(int number) {
        this.number = number;
    }

    @Override
    public int interpret() {
        return this.number;
    }
}

// 3. Expresiones No Terminales (Operaciones)
public class AddExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public AddExpression(Expression left, Expression right) {
        this.leftExpression = left;
        this.rightExpression = right;
    }

    @Override
    public int interpret() {
        return leftExpression.interpret() + rightExpression.interpret();
    }
}

public class SubtractExpression implements Expression {
    private Expression leftExpression;
    private Expression rightExpression;

    public SubtractExpression(Expression left, Expression right) {
        this.leftExpression = left;
        this.rightExpression = right;
    }

    @Override
    public int interpret() {
        return leftExpression.interpret() - rightExpression.interpret();
    }
}

// 4. Cliente
public class Main {
    public static void main(String[] args) {
        // Expresión para evaluar: (5 + 10) - 3
        Expression cinco = new NumberExpression(5);
        Expression diez = new NumberExpression(10);
        Expression tres = new NumberExpression(3);

        Expression suma = new AddExpression(cinco, diez); // 15
        Expression resta = new SubtractExpression(suma, tres); // 15 - 3 = 12

        int resultado = resta.interpret();
        System.out.println("El resultado de evaluar '(5 + 10) - 3' es: " + resultado);
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Resta as SubtractExpression
    participant Suma as AddExpression
    participant Cinco as NumberExpression (5)
    participant Diez as NumberExpression (10)
    participant Tres as NumberExpression (3)

    Cliente->>Resta: interpret()
    Resta->>Suma: interpret()
    Suma->>Cinco: interpret()
    Cinco-->>Suma: 5
    Suma->>Diez: interpret()
    Diez-->>Suma: 10
    Suma-->>Resta: 15
    Resta->>Tres: interpret()
    Tres-->>Resta: 3
    Resta-->>Cliente: 12`,
    realCase: {
      descripcion: "Se utiliza para parsear y evaluar lenguajes o lenguajes de marcado específicos.",
      ejemplos: [
        "Motores de expresiones regulares (RegEx).",
        "Analizadores de sentencias SQL simples.",
        "Evaluadores de fórmulas lógicas o matemáticas en hojas de cálculo."
      ]
    }
  },
  {
    id: "iterator",
    name: "Iterator",
    englishName: "Iterador",
    concept: {
      definicion: "Permite recorrer los elementos de una colección sin exponer su representación subyacente (ya sea una lista, pila, árbol, etc.).",
      ideaCentral: "Extraer la responsabilidad del recorrido de una colección y colocarla en un objeto independiente llamado Iterador.",
      problema: "Las colecciones almacenan datos en estructuras complejas (listas enlazadas, árboles binarios, grafos). Si el cliente necesita recorrerlos todos, debe conocer detalles internos de cada estructura, acoplándose a ellas e imposibilitando cambiar de estructura fácilmente.",
      cuandoUsar: [
        "Cuando tu colección tenga una estructura de datos compleja por debajo y quieras ocultar su complejidad al cliente por motivos de comodidad o seguridad.",
        "Cuando quieras reducir la duplicación del código de recorrido en tu aplicación.",
        "Cuando quieras que tu código pueda recorrer diferentes estructuras de datos."
      ],
      analogia: "Una guía turística en una ciudad: la ciudad contiene museos, calles y parques (colección). En vez de que tú tengas que descifrar el mapa y caminos por tu cuenta, contratas un guía (iterador) que te lleva paso a paso por la mejor ruta."
    },
    uml: `classDiagram
    class Iterator {
        <<interface>>
        +hasNext() boolean
        +next() Object
    }
    class ConcreteIterator {
        -collection: ConcreteCollection
        -currentIndex: int
        +hasNext() boolean
        +next() Object
    }
    class Collection {
        <<interface>>
        +createIterator() Iterator
    }
    class ConcreteCollection {
        +createIterator() Iterator
    }
    Iterator <|.. ConcreteIterator
    Collection <|.. ConcreteCollection
    ConcreteIterator --> ConcreteCollection`,
    components: [
      { clase: "Iterator (Interfaz Iterador)", responsabilidad: "Declara las operaciones necesarias para recorrer una colección: obtener el siguiente elemento, verificar si hay más, etc." },
      { clase: "ConcreteIterator (Iterador Concreto)", responsabilidad: "Implementa el algoritmo específico para recorrer una colección en particular." },
      { clase: "IterableCollection (Colección Iterable)", responsabilidad: "Declara el método para crear o recuperar un iterador compatible con la colección." },
      { clase: "ConcreteCollection (Colección Concreta)", responsabilidad: "Devuelve una instancia nueva de un iterador concreto cada vez que el cliente lo solicita." }
    ],
    advantages: [
      { titulo: "Principio de Responsabilidad Única", descripcion: "Puedes limpiar el código cliente y las colecciones extrayendo algoritmos de recorrido pesados en clases individuales." },
      { titulo: "Principio de Abierto/Cerrado", descripcion: "Puedes implementar nuevos tipos de colecciones e iteradores y pasarlos al código existente sin romper nada." },
      { titulo: "Recorridos Paralelos", descripcion: "Varios iteradores pueden recorrer la misma colección simultáneamente porque cada uno guarda su propio estado." }
    ],
    disadvantages: [
      { titulo: "Sobrecarga de clases", descripcion: "Aplicar el patrón puede ser excesivo si tu aplicación solo trabaja con listas simples." },
      { titulo: "Menor eficiencia", descripcion: "El uso de un iterador puede ser ligeramente menos eficiente que recorrer una estructura de datos simple directamente en ciertos lenguajes." }
    ],
    javaCode: `// 1. Interfaz Iterator
public interface Iterator<T> {
    boolean hasNext();
    T next();
}

// 2. Interfaz Colección
public interface MyCollection<T> {
    Iterator<T> createIterator();
}

// 3. Colección Concreta
import java.util.ArrayList;
import java.util.List;

public class NameCollection implements MyCollection<String> {
    private List<String> names = new ArrayList<>();

    public void addName(String name) {
        names.add(name);
    }

    @Override
    public Iterator<String> createIterator() {
        return new NameIterator(names);
    }
}

// 4. Iterador Concreto
import java.util.List;

public class NameIterator implements Iterator<String> {
    private List<String> names;
    private int position = 0;

    public NameIterator(List<String> names) {
        this.names = names;
    }

    @Override
    public boolean hasNext() {
        return position < names.size();
    }

    @Override
    public String next() {
        if (this.hasNext()) {
            return names.get(position++);
        }
        return null;
    }
}

// 5. Cliente
public class Main {
    public static void main(String[] args) {
        NameCollection coleccion = new NameCollection();
        coleccion.addName("Carlos");
        coleccion.addName("Ana");
        coleccion.addName("Sofía");
        coleccion.addName("Luis");

        Iterator<String> iterador = coleccion.createIterator();
        System.out.println("Recorriendo la colección de nombres:");
        while (iterador.hasNext()) {
            String nombre = iterador.next();
            System.out.println("- Nombre: " + nombre);
        }
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Coleccion as NameCollection
    participant Iterador as NameIterator

    Cliente->>Coleccion: createIterator()
    Coleccion-->>Cliente: iterador (NameIterator)
    loop Mientras hasNext() es true
        Cliente->>Iterador: hasNext()
        Iterador-->>Cliente: true
        Cliente->>Iterador: next()
        Iterador-->>Cliente: "NombreElemento"
    end`,
    realCase: {
      descripcion: "Es uno de los patrones más comunes de la programación moderna, implementado nativamente en casi todos los lenguajes.",
      ejemplos: [
        "El bucle foreach de Java (detrás de bambalinas utiliza la interfaz java.util.Iterator).",
        "Colecciones de Java como ArrayList, HashSet, HashMap y sus métodos iterator().",
        "Los generadores de JavaScript/TypeScript (`yield` y el protocolo Iterable)."
      ]
    }
  },
  {
    id: "mediator",
    name: "Mediator",
    englishName: "Mediador",
    concept: {
      definicion: "Define un objeto que encapsula cómo se interactúa un conjunto de objetos. Promueve el acoplamiento débil al evitar que los objetos se refieran entre sí explícitamente, permitiendo variar su interacción de forma independiente.",
      ideaCentral: "Centralizar la comunicación entre varios componentes en un solo objeto mediador para evitar conexiones directas y caóticas de tipo 'muchos-a-muchos'.",
      problema: "Cuando una interfaz o sistema tiene muchos componentes interconectados (por ejemplo, botones, campos de texto, listas que se habilitan o deshabilitan según las selecciones del usuario), cada clase empieza a depender directamente de las demás, haciendo imposible reutilizar un botón en otra pantalla sin arrastrar todo el resto de clases.",
      cuandoUsar: [
        "Cuando sea difícil cambiar algunas clases porque están estrechamente acopladas con muchas otras.",
        "Cuando no puedas reutilizar un componente en un programa diferente porque depende demasiado de otros componentes.",
        "Cuando te encuentres creando una gran cantidad de subclases de componentes solo para cambiar su comportamiento en diferentes situaciones."
      ],
      analogia: "Una torre de control de aeropuerto: Los pilotos de los aviones no hablan directamente entre ellos para coordinar aterrizajes y despegues (lo que causaría accidentes catastróficos). En su lugar, todos hablan con el controlador aéreo (Mediador), quien centraliza, organiza y autoriza las operaciones."
    },
    uml: `classDiagram
    class Mediator {
        <<interface>>
        +notify(sender: Component, event: String) void
    }
    class ConcreteMediator {
        -componentA: ComponentA
        -componentB: ComponentB
        +notify(sender: Component, event: String) void
    }
    class Component {
        -mediator: Mediator
        +setMediator(mediator: Mediator)
    }
    Mediator <|.. ConcreteMediator
    ConcreteMediator --> Component
    Component --> Mediator`,
    components: [
      { clase: "Mediator (Interfaz Mediador)", responsabilidad: "Declara los métodos de comunicación con los componentes, usualmente un único método notify()." },
      { clase: "ConcreteMediator (Mediador Concreto)", responsabilidad: "Gestiona las relaciones y coordina el comportamiento de todos los componentes concretos." },
      { clase: "Colleagues (Colegas / Componentes)", responsabilidad: "Clases diversas que ejecutan lógica de negocio. Se comunican únicamente con el Mediador, nunca entre sí." }
    ],
    advantages: [
      { titulo: "Menos acoplamiento", descripcion: "Reduce las dependencias caóticas y directas entre los diversos colegas del sistema." },
      { titulo: "Reutilización de componentes", descripcion: "Al estar desacoplados de otros elementos, los componentes individuales son mucho más fáciles de reutilizar en otros contextos." },
      { titulo: "Centralización de control", descripcion: "Permite modificar el comportamiento comunicativo de todo el sistema en una sola clase mediadora." }
    ],
    disadvantages: [
      { titulo: "Objeto Todopoderoso (God Object)", descripcion: "Con el tiempo, un mediador puede crecer sin control y convertirse en un monolito complejo difícil de mantener." }
    ],
    javaCode: `// 1. Interfaz Mediador
public interface ChatMediator {
    void sendMessage(String msg, User user);
    void addUser(User user);
}

// 2. Clase Colega Abstracta
public abstract class User {
    protected ChatMediator mediator;
    protected String name;

    public User(ChatMediator med, String name) {
        this.mediator = med;
        this.name = name;
    }

    public abstract void send(String msg);
    public abstract void receive(String msg);
}

// 3. Colega Concreto
public class ChatUser extends User {
    public ChatUser(ChatMediator med, String name) {
        super(med, name);
    }

    @Override
    public void send(String msg) {
        System.out.println(this.name + " envía: " + msg);
        mediator.sendMessage(msg, this);
    }

    @Override
    public void receive(String msg) {
        System.out.println(this.name + " recibió: " + msg);
    }
}

// 4. Mediador Concreto
import java.util.ArrayList;
import java.util.List;

public class ChatMediatorImpl implements ChatMediator {
    private List<User> users = new ArrayList<>();

    @Override
    public void addUser(User user) {
        this.users.add(user);
    }

    @Override
    public void sendMessage(String msg, User sender) {
        for (User u : this.users) {
            // El emisor no recibe su propio mensaje
            if (u != sender) {
                u.receive(msg);
            }
        }
    }
}

// 5. Cliente
public class Main {
    public static void main(String[] args) {
        ChatMediator mediator = new ChatMediatorImpl();

        User user1 = new ChatUser(mediator, "Juan");
        User user2 = new ChatUser(mediator, "María");
        User user3 = new ChatUser(mediator, "Pedro");

        mediator.addUser(user1);
        mediator.addUser(user2);
        mediator.addUser(user3);

        user1.send("Hola a todos en el chat!");
    }
}`,
    flow: `sequenceDiagram
    participant Juan as User 1 (Juan)
    participant Mediador as ChatMediator
    participant Maria as User 2 (María)
    participant Pedro as User 3 (Pedro)

    Juan->>Mediador: send("Hola")
    Mediador->>Maria: receive("Hola")
    Mediador->>Pedro: receive("Hola")`,
    realCase: {
      descripcion: "Se aplica ampliamente en sistemas con interacciones complejas de UI y arquitecturas de red.",
      ejemplos: [
        "Sistemas de chat grupal y mensajería instantánea: El servidor de chat actúa como mediador para retransmitir los mensajes.",
        "Controladores de UI complejos (JavaFX, Swing, React): Un componente padre o un estado centralizado (Redux) maneja los eventos de todos los inputs.",
        "Sistemas de control de tráfico aéreo."
      ]
    }
  },
  {
    id: "memento",
    name: "Memento",
    englishName: "Recuerdo / Memento",
    concept: {
      definicion: "Permite guardar y restaurar el estado previo de un objeto sin revelar los detalles de su implementación (es decir, respetando el encapsulamiento).",
      ideaCentral: "Crear un objeto copia de estado privado (Memento) que solo el dueño del estado (Originator) puede leer y escribir, y que es almacenado pasivamente por un cuidador (Caretaker).",
      problema: "Para deshacer un cambio, un editor necesita copiar todas las variables internas de un documento. Pero si estas variables son privadas, copiarlas desde fuera viola los principios de encapsulamiento de la POO. Y si las hacemos públicas, cualquier clase externa podría modificarlas rompiendo la coherencia de los datos.",
      cuandoUsar: [
        "Cuando quieras guardar instantáneas (snapshots) del estado de un objeto para poder volver a un estado anterior.",
        "Cuando la obtención directa de los campos/atributos del objeto viole su encapsulación."
      ],
      analogia: "Guardar partida en un videojuego: En cualquier momento puedes guardar la partida (Memento). Si tu personaje es derrotado por un jefe final, puedes cargar el punto de control restaurando la vida, posición e inventario exactos que tenías."
    },
    uml: `classDiagram
    class Memento {
        -state: String
        +getState() String
    }
    class Originator {
        -state: String
        +save() Memento
        +restore(m: Memento)
    }
    class Caretaker {
        -history: List~Memento~
        +backup() void
        +undo() void
    }
    Originator ..> Memento
    Caretaker o-- Memento`,
    components: [
      { clase: "Originator (Creador / Originador)", responsabilidad: "El objeto que posee el estado original. Puede crear mementos con su estado actual y usarlos para restaurarse." },
      { clase: "Memento (Recuerdo)", responsabilidad: "Objeto inmutable que almacena el estado del Originator. Ninguna clase externa tiene acceso a sus datos internos excepto el propio Originator." },
      { clase: "Caretaker (Cuidador)", responsabilidad: "Se encarga de guardar y llevar un registro de los mementos en un historial. No lee ni modifica los datos del memento." }
    ],
    advantages: [
      { titulo: "Respeta el encapsulamiento", descripcion: "Permite almacenar copias de estado sin exponer detalles internos de la clase que los genera." },
      { titulo: "Simplifica el código del creador", descripcion: "Permite delegar la responsabilidad del almacenamiento del historial a una clase cuidadora externa." }
    ],
    disadvantages: [
      { titulo: "Alto consumo de memoria", descripcion: "Si los mementos guardan mucha información o se crean muy seguido, la memoria RAM puede saturarse rápidamente." },
      { titulo: "Ciclo de vida del historial", descripcion: "El cuidador debe gestionar la eliminación de mementos obsoletos para evitar fugas de memoria." }
    ],
    javaCode: `// 1. Memento (Inmutable)
public final class EditorMemento {
    private final String content;

    public EditorMemento(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

// 2. Originador (Originator)
public class Editor {
    private String content;

    public void setContent(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public EditorMemento save() {
        return new EditorMemento(content);
    }

    public void restore(EditorMemento memento) {
        if (memento != null) {
            this.content = memento.getContent();
        }
    }
}

// 3. Cuidador (Caretaker)
import java.util.Stack;

public class History {
    private Stack<EditorMemento> history = new Stack<>();
    private Editor editor;

    public History(Editor editor) {
        this.editor = editor;
    }

    public void backup() {
        history.push(editor.save());
    }

    public void undo() {
        if (!history.isEmpty()) {
            EditorMemento memento = history.pop();
            editor.restore(memento);
        } else {
            System.out.println("Historial vacío. No se puede deshacer.");
        }
    }
}

// 4. Cliente
public class Main {
    public static void main(String[] args) {
        Editor editor = new Editor();
        History history = new History(editor);

        editor.setContent("Versión 1: Párrafo inicial.");
        history.backup(); // Guardamos V1
        System.out.println("Estado actual: " + editor.getContent());

        editor.setContent("Versión 2: Modificación del texto.");
        history.backup(); // Guardamos V2
        System.out.println("Estado actual: " + editor.getContent());

        editor.setContent("Versión 3: Texto final destructivo.");
        System.out.println("Estado actual: " + editor.getContent());

        // Deshacer una vez (Volver a V2)
        history.undo();
        System.out.println("Deshacer 1: " + editor.getContent());

        // Deshacer otra vez (Volver a V1)
        history.undo();
        System.out.println("Deshacer 2: " + editor.getContent());
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Originador as Editor
    participant Cuidador as History
    participant Memento as EditorMemento

    Cliente->>Originador: setContent("Texto 1")
    Cliente->>Cuidador: backup()
    Cuidador->>Originador: save()
    create participant Memento
    Originador->>Memento: new EditorMemento("Texto 1")
    Originador-->>Cuidador: memento
    Cuidador->>Cuidador: Guardar en pila
    Note over Originador: El estado cambia a "Texto 2"
    Cliente->>Cuidador: undo()
    Cuidador->>Cuidador: Sacar de pila
    Cuidador->>Originador: restore(memento)
    Originador->>Memento: getContent()
    Memento-->>Originador: "Texto 1"
    Note over Originador: Estado restaurado`,
    realCase: {
      descripcion: "Muy utilizado en utilidades de recuperación y sistemas de control de versiones.",
      ejemplos: [
        "Sistemas de guardado de estado en videojuegos (Quicksaves).",
        "Implementación del historial de ediciones en editores gráficos o de texto.",
        "Sistemas de transacciones de bases de datos para realizar Rollback si ocurre algún fallo."
      ]
    }
  },
  {
    id: "observer",
    name: "Observer",
    englishName: "Observador",
    concept: {
      definicion: "Define una dependencia de uno-a-muchos entre objetos, de forma que cuando un objeto cambie de estado, todos sus dependientes sean notificados y actualizados automáticamente.",
      ideaCentral: "Establecer un modelo de suscripción donde un objeto 'Sujeto' mantiene una lista de 'Observadores' interesados en sus eventos o estado y les notifica automáticamente cuando cambia.",
      problema: "Si un cliente o componente necesita saber cuándo cambia una variable de otro objeto, la única forma directa es preguntar constantemente en un ciclo infinito (polling). Esto consume muchísima CPU y genera código ineficiente y acoplado.",
      cuandoUsar: [
        "Cuando el cambio de estado de un objeto requiera cambiar otros objetos y no sepas cuántos objetos deben cambiar o quiénes son.",
        "Cuando un objeto deba notificar a otros sin hacer suposiciones sobre la identidad de estos objetos."
      ],
      analogia: "Una suscripción a un canal de YouTube: En vez de entrar todos los días al canal a revisar si hay un nuevo video, te suscribes. Cuando el creador de contenido (Sujeto) sube un video, YouTube notifica a todos los suscriptores (Observadores) de forma automática."
    },
    uml: `classDiagram
    class Subject {
        -observers: List~Observer~
        +attach(o: Observer)
        +detach(o: Observer)
        +notify()
    }
    class Observer {
        <<interface>>
        +update(state: String)
    }
    class ConcreteObserver {
        +update(state: String)
    }
    Subject --> Observer
    Observer <|.. ConcreteObserver`,
    components: [
      { clase: "Subject / Publisher (Sujeto / Emisor)", responsabilidad: "Mantiene la lista de observadores y provee métodos para suscribirse, desuscribirse y notificar cambios." },
      { clase: "Observer / Subscriber (Observador / Suscriptor)", responsabilidad: "Declara la interfaz de actualización, usualmente un método update() que recibe información del evento." },
      { clase: "ConcreteObserver (Observador Concreto)", responsabilidad: "Implementa el método update() y reacciona de forma personalizada al cambio de estado del Sujeto." }
    ],
    advantages: [
      { titulo: "Bajo acoplamiento", descripcion: "El Sujeto solo conoce una interfaz abstracta de observadores, permitiendo añadir o quitar observadores dinámicamente sin alterar su código." },
      { titulo: "Difusión de datos automática", descripcion: "Envía notificaciones a múltiples objetos interesados sin necesidad de polling manual." }
    ],
    disadvantages: [
      { titulo: "Notificaciones desordenadas", descripcion: "Los observadores son notificados en un orden aleatorio o no garantizado.", },
      { titulo: "Fugas de memoria (Lapsed Listener)", descripcion: "Si los observadores no se desuscriben al destruirse, el Sujeto mantiene referencias a ellos evitando que el Garbage Collector los libere." }
    ],
    javaCode: `// 1. Interfaz Observer
public interface Observer {
    void update(String news);
}

// 2. Clase Sujeto (Subject)
import java.util.ArrayList;
import java.util.List;

public class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String latestNews;

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    public void setNews(String news) {
        this.latestNews = news;
        notifyAllObservers();
    }

    private void notifyAllObservers() {
        for (Observer observer : observers) {
            observer.update(latestNews);
        }
    }
}

// 3. Observadores Concretos
public class EmailSubscriber implements Observer {
    private String email;

    public EmailSubscriber(String email) {
        this.email = email;
    }

    @Override
    public void update(String news) {
        System.out.println("Email enviado a " + email + " con la noticia: " + news);
    }
}

public class MobileAppSubscriber implements Observer {
    private String userId;

    public MobileAppSubscriber(String userId) {
        this.userId = userId;
    }

    @Override
    public void update(String news) {
        System.out.println("Notificación Push enviada al usuario " + userId + ": " + news);
    }
}

// 4. Cliente
public class Main {
    public static void main(String[] args) {
        NewsAgency agencia = new NewsAgency();

        Observer sub1 = new EmailSubscriber("carlos@test.com");
        Observer sub2 = new MobileAppSubscriber("user_992");

        agencia.addObserver(sub1);
        agencia.addObserver(sub2);

        System.out.println("--- Agencia publica noticia ---");
        agencia.setNews("¡Se descubre una nueva patente de patrones de comportamiento!");

        System.out.println("\\n--- Agencia remueve un suscriptor y publica de nuevo ---");
        agencia.removeObserver(sub1);
        agencia.setNews("Nueva versión de Java lanzada hoy.");
    }
}`,
    flow: `sequenceDiagram
    participant Agencia as NewsAgency
    participant Sub1 as EmailSubscriber
    participant Sub2 as MobileAppSubscriber

    Note over Agencia: setNews("¡Nueva Noticia!")
    Agencia->>Sub1: update("¡Nueva Noticia!")
    Note over Sub1: Procesa envío de correo
    Agencia->>Sub2: update("¡Nueva Noticia!")
    Note over Sub2: Muestra alerta push`,
    realCase: {
      descripcion: "Es un pilar fundamental en arquitecturas reactivas y manejo de eventos.",
      ejemplos: [
        "Manejo de eventos en JavaScript/DOM: addEventListener() añade observadores para escuchar clicks o teclas.",
        "Programación Reactiva con RxJS / ReactiveX (Observables y Observers).",
        "React: El sistema de renderizado de componentes que observan cambios de estado (useState, Redux, Context API)."
      ]
    }
  },
  {
    id: "state",
    name: "State",
    englishName: "Estado",
    concept: {
      definicion: "Permite a un objeto alterar su comportamiento cuando su estado interno cambia. El objeto parecerá cambiar de clase.",
      ideaCentral: "Extraer los comportamientos específicos de cada estado a clases independientes que implementan una interfaz común, y delegar el trabajo al estado activo actual.",
      problema: "Cuando una clase tiene una máquina de estados compleja (como un pedido de compras con estados: Pendiente, Pagado, Enviado, Cancelado), su código se llena de condicionales gigantescos (if-else o switch) que validan el estado antes de cada acción. Añadir un nuevo estado requiere alterar todos los métodos de la clase.",
      cuandoUsar: [
        "Cuando tengas un objeto que se comporta de forma diferente dependiendo de su estado actual, el número de estados sea enorme y el código del estado cambie con frecuencia.",
        "Cuando tengas una clase contaminada con condiciones masivas que gobiernan cómo se comporta la clase de acuerdo con los valores actuales de los campos de la clase."
      ],
      analogia: "El botón de bloqueo de un smartphone: Si la pantalla está apagada, pulsar el botón enciende la pantalla (Estado Apagado). Si la pantalla está encendida pero bloqueada, pulsar el botón apaga la pantalla (Estado Bloqueado). Si la pantalla está desbloqueada y en uso, pulsar el botón bloquea y apaga el teléfono (Estado Activo)."
    },
    uml: `classDiagram
    class State {
        <<interface>>
        +insertCoin(context: VendingMachine) void
        +pressButton(context: VendingMachine) void
        +dispense(context: VendingMachine) void
    }
    class NoCoinState {
        +insertCoin(context: VendingMachine) void
        +pressButton(context: VendingMachine) void
        +dispense(context: VendingMachine) void
    }
    class CoinInsertedState {
        +insertCoin(context: VendingMachine) void
        +pressButton(context: VendingMachine) void
        +dispense(context: VendingMachine) void
    }
    class VendingMachine {
        -state: State
        +setState(state: State)
        +insertCoin() void
        +pressButton() void
    }
    VendingMachine --> State
    State <|.. NoCoinState
    State <|.. CoinInsertedState`,
    components: [
      { clase: "Context (Contexto)", responsabilidad: "Mantiene la referencia a una instancia de un estado concreto y delega en ella todo el trabajo específico del estado." },
      { clase: "State (Interfaz Estado)", responsabilidad: "Declara los métodos para todas las acciones posibles del contexto en cualquier estado." },
      { clase: "Concrete States (Estados Concretos)", responsabilidad: "Implementan sus propios comportamientos para las acciones del contexto y manejan las transiciones al siguiente estado." }
    ],
    advantages: [
      { titulo: "Principio de Responsabilidad Única", descripcion: "Organiza el código asociado con estados particulares en clases separadas." },
      { titulo: "Principio de Abierto/Cerrado", descripcion: "Introduce nuevos estados sin cambiar el código de los estados existentes ni del contexto." },
      { titulo: "Eliminación de condicionales", descripcion: "Reemplaza los condicionales gigantescos y difíciles de leer por polimorfismo simple." }
    ],
    disadvantages: [
      { titulo: "Sobrediseño", descripcion: "Aplicar el patrón puede ser excesivo si la máquina de estados es extremadamente simple y rara vez cambia." }
    ],
    javaCode: `// 1. Interfaz State
public interface State {
    void insertCoin(VendingMachine machine);
    void pressButton(VendingMachine machine);
    void dispense(VendingMachine machine);
}

// 2. Clase Contexto
public class VendingMachine {
    private State currentState;

    public VendingMachine() {
        // Estado inicial
        this.currentState = new NoCoinState();
    }

    public void setState(State state) {
        this.currentState = state;
    }

    public void insertCoin() {
        currentState.insertCoin(this);
    }

    public void pressButton() {
        currentState.pressButton(this);
    }

    public void dispense() {
        currentState.dispense(this);
    }
}

// 3. Estados Concretos
public class NoCoinState implements State {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Moneda insertada correctamente.");
        machine.setState(new CoinInsertedState());
    }

    @Override
    public void pressButton(VendingMachine machine) {
        System.out.println("Error: No puedes comprar sin insertar una moneda primero.");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Error: Inserta una moneda primero.");
    }
}

public class CoinInsertedState implements State {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Moneda ya insertada. No puedes ingresar otra.");
    }

    @Override
    public void pressButton(VendingMachine machine) {
        System.out.println("Botón presionado. Dispensando producto...");
        machine.setState(new ProductDeliveredState());
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Presiona el botón para dispensar.");
    }
}

public class ProductDeliveredState implements State {
    @Override
    public void insertCoin(VendingMachine machine) {
        System.out.println("Espera a recibir tu producto actual.");
    }

    @Override
    public void pressButton(VendingMachine machine) {
        System.out.println("Ya has ordenado. Dispensando...");
    }

    @Override
    public void dispense(VendingMachine machine) {
        System.out.println("Producto entregado. ¡Gracias por su compra!");
        machine.setState(new NoCoinState());
    }
}

// 4. Cliente
public class Main {
    public static void main(String[] args) {
        VendingMachine maquina = new VendingMachine();

        System.out.println("--- Intento de compra inicial ---");
        maquina.pressButton();

        System.out.println("\\n--- Ingresar moneda y comprar ---");
        maquina.insertCoin();
        maquina.pressButton();
        maquina.dispense();

        System.out.println("\\n--- Comprobar retorno a estado inicial ---");
        maquina.pressButton();
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Context as VendingMachine
    participant NoCoin as NoCoinState
    participant CoinIn as CoinInsertedState

    Cliente->>Context: insertCoin()
    Context->>NoCoin: insertCoin(this)
    NoCoin->>Context: setState(CoinInsertedState)
    Note over Context: Estado ahora es CoinInsertedState
    Cliente->>Context: pressButton()
    Context->>CoinIn: pressButton(this)
    Note over CoinIn: Realiza compra y cambia estado`,
    realCase: {
      descripcion: "Se utiliza en sistemas de negocio con flujos de aprobación y lógicas de automatización de estados.",
      ejemplos: [
        "Máquinas expendedoras físicas e interfaces de cajero automático (ATM).",
        "Sistemas de gestión de pedidos (E-commerce): Carrito -> Procesando -> Enviado -> Entregado.",
        "Inteligencia Artificial de enemigos en videojuegos: Patrullar -> Perseguir -> Atacar -> Huir."
      ]
    }
  },
  {
    id: "strategy",
    name: "Strategy",
    englishName: "Estrategia",
    concept: {
      definicion: "Define una familia de algoritmos, encapsula cada uno de ellos y los hace intercambiables. Permite que el algoritmo varíe independientemente de los clientes que lo utilizan.",
      ideaCentral: "Extraer los diferentes comportamientos o algoritmos de una clase y colocarlos en interfaces y clases de estrategia intercambiables.",
      problema: "Si una clase de carrito de compras tiene un método para pagar, y soporta Tarjeta de Crédito, PayPal y Criptomonedas, el código se llena de condicionales. Añadir un nuevo método de pago requiere modificar la clase principal, violando el principio Open/Closed.",
      cuandoUsar: [
        "Cuando quieras usar diferentes variantes de un algoritmo dentro de un objeto y poder cambiar de algoritmo durante el tiempo de ejecución.",
        "Cuando tengas muchas clases similares que solo difieren en la forma en que ejecutan algún comportamiento.",
        "Cuando quieras aislar la lógica de negocio de los detalles de implementación de algoritmos que tal vez no sean tan importantes."
      ],
      analogia: "Viajar al aeropuerto: Puedes ir en autobús, en taxi, en tren o en tu propio coche. Cada una es una estrategia para llegar a tu destino. Eliges la estrategia en función de tu presupuesto, tiempo y comodidad."
    },
    uml: `classDiagram
    class Strategy {
        <<interface>>
        +execute(a: int, b: int) int
    }
    class ConcreteStrategyAdd {
        +execute(a: int, b: int) int
    }
    class ConcreteStrategySubtract {
        +execute(a: int, b: int) int
    }
    class Context {
        -strategy: Strategy
        +setStrategy(strategy: Strategy)
        +executeStrategy(a: int, b: int) int
    }
    Context --> Strategy
    Strategy <|.. ConcreteStrategyAdd
    Strategy <|.. ConcreteStrategySubtract`,
    components: [
      { clase: "Context (Contexto)", responsabilidad: "Mantiene la referencia a una estrategia concreta y se comunica con ella exclusivamente a través de la interfaz Strategy." },
      { clase: "Strategy (Interfaz Estrategia)", responsabilidad: "Declara el método común para todas las estrategias concretas admitidas." },
      { clase: "ConcreteStrategies (Estrategias Concretas)", responsabilidad: "Implementan las distintas variaciones del algoritmo o comportamiento." }
    ],
    advantages: [
      { titulo: "Intercambiable en ejecución", descripcion: "Puedes sustituir los algoritmos usados dentro de un objeto sobre la marcha." },
      { titulo: "Desacoplamiento total", descripcion: "Aísla el código de implementación de un algoritmo del código de la lógica del cliente." },
      { titulo: "Eliminación de herencia", descripcion: "Evita el uso de herencia masiva para cambiar solo una parte pequeña del comportamiento de un objeto." }
    ],
    disadvantages: [
      { titulo: "Complejidad innecesaria", descripcion: "Si solo tienes un par de algoritmos que rara vez cambian, introducir el patrón complica el diseño sin necesidad." },
      { titulo: "Conocimiento del cliente", descripcion: "Los clientes deben conocer la diferencia entre las distintas estrategias para poder elegir la adecuada." }
    ],
    javaCode: `// 1. Interfaz Strategy
public interface PaymentStrategy {
    void collectPaymentDetails();
    boolean validatePaymentDetails();
    void pay(double amount);
}

// 2. Estrategia Concreta: Tarjeta
public class CreditCardPayment implements PaymentStrategy {
    private String cardNumber;
    private String cvv;

    public CreditCardPayment(String cardNumber, String cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }

    @Override
    public void collectPaymentDetails() {
        System.out.println("Obteniendo datos de tarjeta...");
    }

    @Override
    public boolean validatePaymentDetails() {
        return cardNumber.length() == 16 && cvv.length() == 3;
    }

    @Override
    public void pay(double amount) {
        System.out.println("Pagando $" + amount + " con Tarjeta de Crédito.");
    }
}

// 3. Estrategia Concreta: PayPal
public class PayPalPayment implements PaymentStrategy {
    private String email;

    public PayPalPayment(String email) {
        this.email = email;
    }

    @Override
    public void collectPaymentDetails() {
        System.out.println("Abriendo ventana de inicio de sesión de PayPal...");
    }

    @Override
    public boolean validatePaymentDetails() {
        return email.contains("@");
    }

    @Override
    public void pay(double amount) {
        System.out.println("Pagando $" + amount + " mediante la cuenta PayPal: " + email);
    }
}

// 4. Contexto
public class ShoppingCart {
    private PaymentStrategy paymentStrategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.paymentStrategy = strategy;
    }

    public void checkout(double amount) {
        if (paymentStrategy == null) {
            System.out.println("Error: Por favor, selecciona un método de pago.");
            return;
        }
        paymentStrategy.collectPaymentDetails();
        if (paymentStrategy.validatePaymentDetails()) {
            paymentStrategy.pay(amount);
        } else {
            System.out.println("Pago rechazado: Datos de pago inválidos.");
        }
    }
}

// 5. Cliente
public class Main {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();

        System.out.println("--- Compra 1 con Tarjeta ---");
        cart.setPaymentStrategy(new CreditCardPayment("1234567890123456", "123"));
        cart.checkout(450.0);

        System.out.println("\\n--- Compra 2 con PayPal ---");
        cart.setPaymentStrategy(new PayPalPayment("cliente@correo.com"));
        cart.checkout(99.90);
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Context as ShoppingCart
    participant Strategy as CreditCardPayment

    Cliente->>Context: setPaymentStrategy(CreditCardPayment)
    Cliente->>Context: checkout(450.0)
    Context->>Strategy: collectPaymentDetails()
    Context->>Strategy: validatePaymentDetails()
    Strategy-->>Context: true
    Context->>Strategy: pay(450.0)
    Strategy-->>Context: Confirmación Pago`,
    realCase: {
      descripcion: "Es de los patrones más implementados para encapsular variaciones de algoritmos comerciales o matemáticos.",
      ejemplos: [
        "Pasarelas de pago múltiples en sistemas e-commerce (Stripe, PayPal, Apple Pay, MercadoPago).",
        "Algoritmos de ordenamiento intercambiables (Sort) según el tamaño del array.",
        "Compresión de archivos: Elegir dinámicamente entre algoritmos ZIP, GZIP o TAR."
      ]
    }
  },
  {
    id: "template-method",
    name: "Template Method",
    englishName: "Método Plantilla",
    concept: {
      definicion: "Define el esqueleto de un algoritmo en una operación, delegando algunos pasos a las subclases. Permite que las subclases redefinan ciertos pasos de un algoritmo sin cambiar su estructura.",
      ideaCentral: "Fijar los pasos generales de un algoritmo en un método de una clase base (método plantilla) y permitir que las subclases implementen o sobrescriban pasos específicos de forma individual.",
      problema: "Dos clases distintas realizan tareas similares con leves variaciones (por ejemplo, generar reportes en PDF y en HTML). Ambas leen datos de la base de datos, los formatean y luego los imprimen. Copiar y pegar el algoritmo completo en ambas clases genera código duplicado y propenso a errores al cambiar las etapas iniciales.",
      cuandoUsar: [
        "Cuando quieras dejar que las subclases extiendan pasos particulares de un algoritmo sin extender el algoritmo entero.",
        "Cuando tengas varias clases que contienen algoritmos casi idénticos con pequeñas diferencias."
      ],
      analogia: "La construcción de casas prefabricadas: La constructora tiene una estructura/plano estándar (Método Plantilla) que define los pasos: cimentar, levantar paredes, techar, pintar. El comprador puede elegir materiales y colores para las paredes y pintura (pasos redefinibles), pero el orden y esqueleto base es inalterable."
    },
    uml: `classDiagram
    class AbstractClass {
        +templateMethod() void
        #step1() void*
        #step2() void*
        #step3() void
    }
    class ConcreteClassA {
        #step1() void
        #step2() void
    }
    class ConcreteClassB {
        #step1() void
        #step2() void
    }
    AbstractClass <|-- ConcreteClassA
    AbstractClass <|-- ConcreteClassB`,
    components: [
      { clase: "AbstractClass (Clase Abstracta)", responsabilidad: "Declara los pasos del algoritmo y define el templateMethod() que llama a dichos pasos en un orden estricto." },
      { clase: "ConcreteClass (Clases Concretas)", responsabilidad: "Sobrescriben las operaciones abstractas para proporcionar la lógica específica de cada paso del algoritmo." }
    ],
    advantages: [
      { titulo: "Reutilización de código", descripcion: "Evita la duplicación del código estructurado moviendo el esqueleto común a una superclase." },
      { titulo: "Extensibilidad controlada", descripcion: "Permite a las subclases personalizar partes específicas del flujo sin comprometer la integridad de la estructura general." }
    ],
    disadvantages: [
      { titulo: "Limitación del esqueleto", descripcion: "Algunos clientes pueden sentirse limitados por el esqueleto rígido del algoritmo original." },
      { titulo: "Violación de Liskov (potencial)", descripcion: "Si se sobrescriben métodos de paso obligatorios de forma inapropiada, se puede romper el funcionamiento esperado de la clase base." }
    ],
    javaCode: `// 1. Clase Abstracta con Método Plantilla
public abstract class DataMiner {
    // El Método Plantilla (es final para evitar que sea modificado)
    public final void mineData(String path) {
        openFile(path);
        extractData();
        parseData();
        analyzeData();
        closeFile();
    }

    // Pasos comunes con implementación por defecto
    protected void analyzeData() {
        System.out.println("Analizando datos extraídos con algoritmo estándar...");
    }

    protected void closeFile() {
        System.out.println("Cerrando archivo de datos.");
    }

    // Pasos abstractos que cada subclase debe definir
    protected abstract void openFile(String path);
    protected abstract void extractData();
    protected abstract void parseData();
}

// 2. Subclase Concreta: Procesador PDF
public class PdfDataMiner extends DataMiner {
    @Override
    protected void openFile(String path) {
        System.out.println("Abriendo archivo PDF desde: " + path);
    }

    @Override
    protected void extractData() {
        System.out.println("Extrayendo flujo de bytes del PDF...");
    }

    @Override
    protected void parseData() {
        System.out.println("Parseando textos y tablas del PDF...");
    }
}

// 3. Subclase Concreta: Procesador CSV
public class CsvDataMiner extends DataMiner {
    @Override
    protected void openFile(String path) {
        System.out.println("Abriendo archivo CSV de texto plano: " + path);
    }

    @Override
    protected void extractData() {
        System.out.println("Extrayendo líneas de texto del CSV...");
    }

    @Override
    protected void parseData() {
        System.out.println("Parseando valores separados por comas (CSV)...");
    }
}

// 4. Cliente
public class Main {
    public static void main(String[] args) {
        System.out.println("=== Minando Datos de PDF ===");
        DataMiner pdfMiner = new PdfDataMiner();
        pdfMiner.mineData("documento_financiero.pdf");

        System.out.println("\\n=== Minando Datos de CSV ===");
        DataMiner csvMiner = new CsvDataMiner();
        csvMiner.mineData("ventas_mensuales.csv");
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Template as DataMiner (PdfDataMiner)

    Cliente->>Template: mineData("doc.pdf")
    Template->>Template: openFile("doc.pdf") (PDF implementation)
    Template->>Template: extractData() (PDF implementation)
    Template->>Template: parseData() (PDF implementation)
    Template->>Template: analyzeData() (Standard implementation)
    Template->>Template: closeFile() (Standard implementation)
    Template-->>Cliente: Fin del proceso`,
    realCase: {
      descripcion: "Es la base del diseño de frameworks orientados a objetos, donde el framework define el ciclo de vida y tú inyectas el código.",
      ejemplos: [
        "Frameworks de pruebas como JUnit (los métodos setUp(), tearDown() se ejecutan bajo un flujo de plantilla predefinido).",
        "Servlets de Java (HttpServlet): El método service() define la plantilla que llama a doGet() o doPost().",
        "React Component Lifecycle: Métodos como componentDidMount() son ganchos (hooks) que el framework ejecuta en un orden estricto."
      ]
    }
  },
  {
    id: "visitor",
    name: "Visitor",
    englishName: "Visitante",
    concept: {
      definicion: "Permite definir una nueva operación sin cambiar las clases de los elementos sobre los que opera.",
      ideaCentral: "Separar los algoritmos de la estructura de objetos sobre la que operan aplicando la técnica del Double Dispatch (doble envío).",
      problema: "Si tienes un árbol de nodos complejo (por ejemplo, elementos de XML o partes de un compilador), añadir una nueva función (como exportar a JSON o validar la consistencia) requiere añadir ese método a todas las clases de nodos del árbol. Esto contamina las clases de la estructura con operaciones ajenas a ellas.",
      cuandoUsar: [
        "Cuando necesites realizar una operación sobre todos los elementos de una estructura de objetos compleja (por ejemplo, un árbol de elementos).",
        "Cuando quieras limpiar la lógica de negocio de operaciones auxiliares.",
        "Cuando una operación solo tenga sentido en algunas clases de la jerarquía de elementos y no en otras."
      ],
      analogia: "Un inspector de salud visitando negocios: El inspector (Visitante) va a un restaurante, a una escuela y a un hospital (Elementos). Cada local lo recibe (accept) y le da acceso a sus instalaciones. El inspector aplica sus conocimientos específicos para revisar las cocinas del restaurante o las salas de hospital, sin que los locales cambien su funcionamiento diario."
    },
    uml: `classDiagram
    class Element {
        <<interface>>
        +accept(v: Visitor) void
    }
    class ConcreteElementA {
        +accept(v: Visitor) void
        +operationA() void
    }
    class Visitor {
        <<interface>>
        +visit(a: ConcreteElementA) void
        +visit(b: ConcreteElementB) void
    }
    class ConcreteVisitor {
        +visit(a: ConcreteElementA) void
        +visit(b: ConcreteElementB) void
    }
    Element ..> Visitor
    Visitor <|.. ConcreteVisitor
    ConcreteElementA ..|> Element`,
    components: [
      { clase: "Element (Interfaz Elemento)", responsabilidad: "Declara un método accept(visitor) que toma la interfaz del visitante como argumento." },
      { clase: "ConcreteElement (Elementos Concretos)", responsabilidad: "Implementan el método accept(). Éste redirige la llamada al método de visita correspondiente del objeto visitante (Double Dispatch)." },
      { clase: "Visitor (Interfaz Visitante)", responsabilidad: "Declara un conjunto de métodos de visita que pueden tomar los elementos concretos como argumentos." },
      { clase: "ConcreteVisitor (Visitante Concreto)", responsabilidad: "Implementa múltiples versiones del mismo algoritmo adaptadas para aplicarse sobre cada elemento concreto de la estructura." }
    ],
    advantages: [
      { titulo: "Principio de Responsabilidad Única", descripcion: "Puedes mover múltiples versiones del mismo comportamiento a una sola clase visitante." },
      { titulo: "Principio de Abierto/Cerrado", descripcion: "Puedes introducir nuevas operaciones sobre clases complejas sin alterarlas." },
      { titulo: "Acumulación de estado", descripcion: "El visitante puede acumular información útil mientras recorre la estructura de nodos." }
    ],
    disadvantages: [
      { titulo: "Acoplamiento inverso", descripcion: "Debes actualizar todos los visitantes si se añade o se elimina una clase de elemento de la estructura." },
      { titulo: "Acceso limitado", descripcion: "Los visitantes pueden carecer del acceso necesario a los campos privados de los elementos con los que trabajan." }
    ],
    javaCode: `// 1. Interfaz Elemento
public interface Shape {
    void accept(Visitor visitor);
}

// 2. Elementos Concretos
public class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    public double getRadius() {
        return radius;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visitCircle(this);
    }
}

public class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    public double getWidth() {
        return width;
    }

    public double getHeight() {
        return height;
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visitRectangle(this);
    }
}

// 3. Interfaz Visitante (Visitor)
public interface Visitor {
    void visitCircle(Circle circle);
    void visitRectangle(Rectangle rectangle);
}

// 4. Visitante Concreto: Exportador de XML
public class XmlExportVisitor implements Visitor {
    @Override
    public void visitCircle(Circle circle) {
        System.out.println("<circle>\\n  <radius>" + circle.getRadius() + "</radius>\\n</circle>");
    }

    @Override
    public void visitRectangle(Rectangle rectangle) {
        System.out.println("<rectangle>\\n  <width>" + rectangle.getWidth() + "</width>\\n  <height>" 
            + rectangle.getHeight() + "</height>\\n</rectangle>");
    }
}

// 5. Cliente
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = new Shape[] {
            new Circle(5.0),
            new Rectangle(10.0, 4.0)
        };

        Visitor xmlVisitor = new XmlExportVisitor();
        System.out.println("Exportando figuras a formato XML:");
        for (Shape shape : shapes) {
            shape.accept(xmlVisitor);
        }
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Elemento as Circle
    participant Visitante as XmlExportVisitor

    Cliente->>Elemento: accept(xmlVisitor)
    Elemento->>Visitante: visitCircle(this)
    Note over Visitante: Ejecuta lógica XML para Circle
    Visitante-->>Elemento: void
    Elemento-->>Cliente: void`,
    realCase: {
      descripcion: "Altamente especializado en operaciones sobre estructuras arbóreas compuestas complejas.",
      ejemplos: [
        "Compiladores y analizadores de código: Operaciones de optimización o generación de código sobre el árbol de sintaxis abstracta (AST).",
        "Motores de renderizado de UI para calcular dimensiones, dibujar elementos o exportar a otros formatos.",
        "Sistemas de análisis de estructuras de documentos (por ejemplo, exportar HTML/XML a PDF)."
      ]
    }
  }
];
