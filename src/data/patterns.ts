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
    codigoResolucion: string;
    lenguajeCodigo: string;
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
        +handle(request: HttpRequest) boolean
    }
    class BaseHandler {
        <<abstract>>
        -next: Handler
        +setNext(handler: Handler) Handler
        +handle(request: HttpRequest) boolean
    }
    class AuthenticationHandler {
        +handle(request: HttpRequest) boolean
    }
    class RateLimitingHandler {
        +handle(request: HttpRequest) boolean
    }
    Handler <|.. BaseHandler
    BaseHandler o-- Handler
    BaseHandler <|-- AuthenticationHandler
    BaseHandler <|-- RateLimitingHandler`,
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
    javaCode: `// Ejemplo Realista: Middleware Pipeline de una API HTTP
public class HttpRequest {
    private final String url;
    private final String token;
    private final String payload;
    private final int requestCount;

    public HttpRequest(String url, String token, String payload, int requestCount) {
        this.url = url;
        this.token = token;
        this.payload = payload;
        this.requestCount = requestCount;
    }

    public String getUrl() { return url; }
    public String getToken() { return token; }
    public String getPayload() { return payload; }
    public int getRequestCount() { return requestCount; }
}

public interface Middleware {
    Middleware setNext(Middleware next);
    boolean check(HttpRequest request);
}

public abstract class BaseMiddleware implements Middleware {
    private Middleware next;

    @Override
    public Middleware setNext(Middleware next) {
        this.next = next;
        return next;
    }

    protected boolean checkNext(HttpRequest request) {
        if (next == null) {
            return true; // Fin de la cadena, todo correcto
        }
        return next.check(request);
    }
}

// EXPOSICIÓN: Destaca cómo el BCP o SUNAT validarían la identidad del contribuyente o cliente aquí.
// Filtro 1: Autenticación
public class AuthenticationMiddleware extends BaseMiddleware {
    @Override
    public boolean check(HttpRequest request) {
        System.out.println("[Middleware Auth] Validando token de acceso...");
        if (!"SUPER-SECRET-TOKEN-123".equals(request.getToken())) {
            System.out.println("[Middleware Auth] Acceso denegado: Token inválido.");
            return false;
        }
        System.out.println("[Middleware Auth] Token verificado correctamente.");
        return checkNext(request);
    }
}

// Filtro 2: Limitador de Tasa (Rate Limiter)
public class RateLimitingMiddleware extends BaseMiddleware {
    private final int maxRequestsPerMinute;

    public RateLimitingMiddleware(int maxRequestsPerMinute) {
        this.maxRequestsPerMinute = maxRequestsPerMinute;
    }

    @Override
    public boolean check(HttpRequest request) {
        System.out.println("[Middleware RateLimit] Validando tasa de solicitudes...");
        if (request.getRequestCount() > maxRequestsPerMinute) {
            System.out.println("[Middleware RateLimit] Solicitud rechazada: Límite excedido (" 
                + request.getRequestCount() + "/" + maxRequestsPerMinute + ")");
            return false;
        }
        System.out.println("[Middleware RateLimit] Tasa permitida.");
        return checkNext(request);
    }
}

// Filtro 3: Validación del Body
public class BodyValidationMiddleware extends BaseMiddleware {
    @Override
    public boolean check(HttpRequest request) {
        System.out.println("[Middleware Validation] Validando formato de datos...");
        if (request.getPayload() == null || request.getPayload().trim().isEmpty()) {
            System.out.println("[Middleware Validation] Solicitud rechazada: Payload vacío.");
            return false;
        }
        System.out.println("[Middleware Validation] Cuerpo válido.");
        return checkNext(request);
    }
}

public class Main {
    public static void main(String[] args) {
        // Inicializar filtros
        Middleware serverPipeline = new AuthenticationMiddleware();
        serverPipeline
            .setNext(new RateLimitingMiddleware(60))
            .setNext(new BodyValidationMiddleware());

        // Enviar peticiones de ejemplo
        HttpRequest peticionValida = new HttpRequest("/api/data", "SUPER-SECRET-TOKEN-123", "{ \"status\": \"ok\" }", 45);
        HttpRequest peticionMalaToken = new HttpRequest("/api/data", "TOKEN-INVALIDO", "{ \"status\": \"ok\" }", 10);
        HttpRequest peticionSpam = new HttpRequest("/api/data", "SUPER-SECRET-TOKEN-123", "{ \"status\": \"ok\" }", 120);

        System.out.println("--- Petición Válida ---");
        boolean ok1 = serverPipeline.check(peticionValida);
        System.out.println("Resultado: " + (ok1 ? "Procesada con éxito." : "Error en servidor."));

        System.out.println("\\n--- Petición con Token Malo ---");
        boolean ok2 = serverPipeline.check(peticionMalaToken);
        System.out.println("Resultado: " + (ok2 ? "Procesada con éxito." : "Rechazada."));

        System.out.println("\\n--- Petición de Spam (Rate Limit) ---");
        boolean ok3 = serverPipeline.check(peticionSpam);
        System.out.println("Resultado: " + (ok3 ? "Procesada con éxito." : "Rechazada."));
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Auth as AuthMiddleware
    participant Rate as RateLimitMiddleware
    participant API as ApiEndpoint

    Cliente->>Auth: check(request)
    Note over Auth: Valida Token
    Auth->>Rate: check(request)
    Note over Rate: Valida Límite
    Rate->>API: Ejecuta Lógica
    API-->>Cliente: Respuesta HTTP 200 OK`,
    realCase: {
      descripcion: "Este patrón es el núcleo detrás de los pipelines de procesamiento de peticiones en la web. Al usarlo, cada middleware actúa como un eslabón que decide si abortar la conexión o pasarla al siguiente middleware configurado.",
      ejemplos: [
        "BCP: Pipeline de validación de transferencias interbancarias (verificando saldo, fraude y límites de Yape/Plin).",
        "SUNAT: Filtros de seguridad y validación de comprobantes electrónicos (CPE) pasando por reglas secuenciales.",
        "Manejo de Middlewares en routers de Express.js y NestJS."
      ],
      codigoResolucion: `// Implementación típica de un Pipeline de Middlewares en Express.js (Node.js)
const express = require('express');
const app = express();

// Eslabón 1: Autenticación
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'SECRET-123') {
    next(); // Pasa al siguiente middleware en la cadena
  } else {
    res.status(401).send('Acceso no autorizado');
  }
};

// Eslabón 2: Validación de datos
const dataValidation = (req, res, next) => {
  if (req.body && req.body.username) {
    next(); // Solicitud correcta, rutea al controlador
  } else {
    res.status(400).send('Falta campo username');
  }
};

// Configuración de la cadena de responsabilidades en la ruta
app.post('/api/profile', authMiddleware, dataValidation, (req, res) => {
  res.send('Perfil del usuario cargado.');
});`,
      lenguajeCodigo: "JavaScript"
    }
  },
  {
    id: "command",
    name: "Command",
    englishName: "Comando",
    concept: {
      definicion: "Convierte una solicitud en un objeto independiente que contiene toda la información sobre la solicitud. Esta transformación permite parametrizar métodos con diferentes solicitudes, retrasar o encolar la ejecución de una solicitud y soportar operaciones que no se pueden realizar directamente.",
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
    class Database {
        +insert(query: String) void
        +delete(query: String) void
    }
    class InsertQueryCommand {
        -db: Database
        -query: String
        +execute() void
        +undo() void
    }
    class TransactionManager {
        -history: List~Command~
        +executeTransaction(cmd: Command)
        +rollback() void
    }
    Command <|.. InsertQueryCommand
    InsertQueryCommand --> Database
    TransactionManager --> Command`,
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
    javaCode: `// Ejemplo Realista: Gestor Transaccional de Base de Datos En-Memoria
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class DatabaseReceiver {
    private final List<String> records = new ArrayList<>();

    public void insert(String record) {
        records.add(record);
        System.out.println("[Database] Fila insertada: '" + record + "'");
    }

    public void remove(String record) {
        records.remove(record);
        System.out.println("[Database] Fila eliminada: '" + record + "'");
    }

    public List<String> getRecords() {
        return records;
    }
}

public interface TransactionCommand {
    void execute();
    void rollback();
}

public class InsertRecordCommand implements TransactionCommand {
    private final DatabaseReceiver db;
    private final String record;

    public InsertRecordCommand(DatabaseReceiver db, String record) {
        this.db = db;
        this.record = record;
    }

    @Override
    public void execute() {
        db.insert(record);
    }

    @Override
    public void rollback() {
        db.remove(record);
    }
}

public class TransactionEngineInvoker {
    private final Stack<TransactionCommand> commandHistory = new Stack<>();

    public void runCommand(TransactionCommand cmd) {
        cmd.execute();
        commandHistory.push(cmd);
    }

    public void rollbackLastTransaction() {
        if (!commandHistory.isEmpty()) {
            TransactionCommand cmd = commandHistory.pop();
            System.out.println("[TransactionEngine] Deshaciendo última acción transaccional...");
            cmd.rollback();
        } else {
            System.out.println("[TransactionEngine] No hay transacciones para revertir.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseReceiver db = new DatabaseReceiver();
        TransactionEngineInvoker engine = new TransactionEngineInvoker();

        System.out.println("Base de datos inicial: " + db.getRecords());

        engine.runCommand(new InsertRecordCommand(db, "Usuario: Carlos"));
        engine.runCommand(new InsertRecordCommand(db, "Usuario: Ana"));
        System.out.println("Base de datos actual: " + db.getRecords());

        engine.rollbackLastTransaction();
        System.out.println("Base de datos después de rollback: " + db.getRecords());
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Invocador as Engine
    participant Comando as InsertCommand
    participant Receptor as DB

    Cliente->>Comando: new InsertCommand(db, "Ana")
    Cliente->>Invocador: runCommand(comando)
    Invocador->>Comando: execute()
    Comando->>Receptor: insert("Ana")
    Invocador->>Invocador: Apilar Comando en Historial`,
    realCase: {
      descripcion: "El patrón Command se utiliza en la arquitectura de interfaces de usuario modernas y sistemas de colas de tareas. Al desacoplar la llamada de la ejecución, es posible realizar operaciones de revertir, registrar historial e incluso procesar comandos de forma asíncrona.",
      ejemplos: [
        "Yape / Plin: Guardar intentos de pago offline como 'Comandos' y procesarlos cuando vuelve el internet.",
        "PedidosYa / Rappi Perú: Encolamiento de órdenes de comida que pueden ser canceladas (Undo) antes de ser preparadas.",
        "Sistemas de Undo/Redo en interfaces o terminales de bancos peruanos."
      ],
      codigoResolucion: `// Ejemplo de Redux Toolkit en Frontend React para manejar comandos de UI
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  text: string;
  history: string[];
}

const initialState: EditorState = {
  text: "",
  history: []
};

// El Slice actúa como el invoker/receptor combinado
const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    // EXPOSICIÓN: Explica que esto es como cuando Yape guarda el pago en la cola para procesarlo luego.
    // Comando Concreto de Escritura
    writeText: (state, action: PayloadAction<string>) => {
      state.history.push(state.text); // Guardar estado para deshacer
      state.text += action.payload;
    },
    // Comando de Revertir (Undo)
    undoAction: (state) => {
      if (state.history.length > 0) {
        state.text = state.history.pop() || "";
      }
    }
  }
});

export const { writeText, undoAction } = editorSlice.actions;
export default editorSlice.reducer;`,
      lenguajeCodigo: "TypeScript"
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
    class Expression {
        <<interface>>
        +interpret(context: Map) boolean
    }
    class EqualsExpression {
        -variable: String
        -value: String
        +interpret(context: Map) boolean
    }
    class AndExpression {
        -left: Expression
        -right: Expression
        +interpret(context: Map) boolean
    }
    Expression <|.. EqualsExpression
    Expression <|.. AndExpression`,
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
    javaCode: `// Ejemplo Realista: Evaluador de Filtros SQL WHERE en colecciones
import java.util.HashMap;
import java.util.Map;

public interface SQLFilterExpression {
    boolean interpret(Map<String, Object> context);
}

// Expresión Terminal: Comprobación de Igualdad
public class EqualsExpression implements SQLFilterExpression {
    private final String column;
    private final Object expectedValue;

    public EqualsExpression(String column, Object expectedValue) {
        this.column = column;
        this.expectedValue = expectedValue;
    }

    @Override
    public boolean interpret(Map<String, Object> context) {
        if (!context.containsKey(column)) return false;
        return expectedValue.equals(context.get(column));
    }
}

// EXPOSICIÓN: Menciona cómo la SUNAT usa esto para combinar reglas como \'Es renta de 4ta\' AND \'Supera los 4000 soles\'.
// Expresión No Terminal: Operación lógica AND
public class AndExpression implements SQLFilterExpression {
    private final SQLFilterExpression left;
    private final SQLFilterExpression right;

    public AndExpression(SQLFilterExpression left, SQLFilterExpression right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean interpret(Map<String, Object> context) {
        return left.interpret(context) && right.interpret(context);
    }
}

public class Main {
    public static void main(String[] args) {
        // Regla: status = 'ACTIVE' AND role = 'ADMIN'
        SQLFilterExpression activeFilter = new EqualsExpression("status", "ACTIVE");
        SQLFilterExpression adminFilter = new EqualsExpression("role", "ADMIN");
        SQLFilterExpression complexQuery = new AndExpression(activeFilter, adminFilter);

        // Registro de usuario en evaluación
        Map<String, Object> user1 = new HashMap<>();
        user1.put("status", "ACTIVE");
        user1.put("role", "ADMIN");

        Map<String, Object> user2 = new HashMap<>();
        user2.put("status", "INACTIVE");
        user2.put("role", "ADMIN");

        System.out.println("¿Usuario 1 cumple los requisitos? " + complexQuery.interpret(user1));
        System.out.println("¿Usuario 2 cumple los requisitos? " + complexQuery.interpret(user2));
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant And as AndExpression
    participant Left as EqualsExpression (status)
    participant Right as EqualsExpression (role)

    Cliente->>And: interpret(user1)
    And->>Left: interpret(user1)
    Left-->>And: true
    And->>Right: interpret(user1)
    Right-->>And: true
    And-->>Cliente: true`,
    realCase: {
      descripcion: "El intérprete es común en motores de reglas empresariales y parseo de consultas dinámicas en tiempo de ejecución. Permite evaluar expresiones complejas e inyectar variables de contexto para procesamiento rápido.",
      ejemplos: [
        "SUNAT: Parseo de reglas dinámicas y fórmulas para el cálculo del Impuesto a la Renta de 4ta y 5ta categoría.",
        "AFP Integra / Prima: Evaluación de reglas para calcular los aportes o la rentabilidad según fondos (Tipo 1, 2 o 3).",
        "Spring Expression Language (SpEL) en Java."
      ],
      codigoResolucion: `// Evaluación dinámica de reglas usando Spring Expression Language (SpEL) en Java
import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;

public class SpelEvaluationExample {
    public static void main(String[] args) {
        ExpressionParser parser = new SpelExpressionParser();
        
        // Expresión lógica de la regla
        Expression exp = parser.parseExpression("age >= 18 and role == 'ADMIN'");
        
        // Definir contexto/datos del usuario
        StandardEvaluationContext context = new StandardEvaluationContext();
        context.setVariable("age", 20);
        context.setVariable("role", "ADMIN");
        
        // Interpretar la expresión lógica en base al contexto
        boolean result = Boolean.TRUE.equals(exp.getValue(context, Boolean.class));
        System.out.println("¿Acceso permitido?: " + result);
    }
}`,
      lenguajeCodigo: "Java"
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
    class DatabaseCursor {
        -data: List
        -index: int
        +hasNext() boolean
        +next() Record
    }
    class Dataset {
        <<interface>>
        +createCursor() Iterator
    }
    class SQLDataset {
        +createCursor() Iterator
    }
    Iterator <|.. DatabaseCursor
    Dataset <|.. SQLDataset`,
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
    javaCode: `// Ejemplo Realista: Recorrido y Cursor de Registros en una Simulación de BD
import java.util.ArrayList;
import java.util.List;

public class Record {
    private final int id;
    private final String data;

    public Record(int id, String data) {
        this.id = id;
        this.data = data;
    }
    public int getId() { return id; }
    public String getData() { return data; }
}

public interface CursorIterator {
    boolean hasNext();
    Record next();
}

public interface QueryDataset {
    CursorIterator createCursor();
}

public class DatabaseDataset implements QueryDataset {
    private final List<Record> records = new ArrayList<>();

    public void addRecord(Record r) {
        records.add(r);
    }

    @Override
    public CursorIterator createCursor() {
        return new DatabaseCursor(records);
    }
}

public class DatabaseCursor implements CursorIterator {
    private final List<Record> records;
    private int position = 0;

    public DatabaseCursor(List<Record> records) {
        this.records = records;
    }

    @Override
    public boolean hasNext() {
        return position < records.size();
    }

    @Override
    public Record next() {
        if (!hasNext()) return null;
        return records.get(position++);
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseDataset ds = new DatabaseDataset();
        ds.addRecord(new Record(1, "Usuario: Carlos"));
        ds.addRecord(new Record(2, "Usuario: Sofía"));

        CursorIterator cursor = ds.createCursor();
        System.out.println("[App] Leyendo base de datos mediante cursor...");
        while (cursor.hasNext()) {
            Record r = cursor.next();
            System.out.println("Registro ID: " + r.getId() + " - Datos: " + r.getData());
        }
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Coleccion as Dataset
    participant Iterador as Cursor

    Cliente->>Coleccion: createCursor()
    Coleccion-->>Cliente: Cursor
    loop Mientras hasNext() es true
        Cliente->>Iterador: hasNext()
        Iterador-->>Cliente: true
        Cliente->>Iterador: next()
        Iterador-->>Cliente: Record
    end`,
    realCase: {
      descripcion: "El recorrido de conjuntos de datos es la base de las APIs de colecciones y lectura de datos masiva desde bases de datos (SQL Cursors, ResultSet). Evita cargar gigabytes de datos en la memoria a la vez cargando elementos secuencialmente.",
      ejemplos: [
        "RENIEC: Recorrer secuencialmente el padrón de millones de ciudadanos sin cargar toda la base de datos en RAM.",
        "ONPE: Iterar sobre las mesas de sufragio y votos a nivel nacional de forma paginada y segura.",
        "El bucle foreach de Java o generadores en TypeScript."
      ],
      codigoResolucion: `// Procesamiento diferido de colecciones en Java usando Iterator de base de datos
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

public class DatabaseResultSetIterator {
    public void processLargeQuery() {
        try (Connection conn = DriverManager.getConnection("jdbc:h2:mem:test", "sa", "");
             Statement stmt = conn.createStatement()) {
             
            // El ResultSet actúa como un Iterator clásico
            ResultSet rs = stmt.executeQuery("SELECT id, name FROM users");
            
            // EXPOSICIÓN: Comenta que esto previene que los servidores de RENIEC colapsen por falta de memoria RAM al leer a todos los peruanos.
            // Recorrido secuencial amortizado en memoria
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                System.out.println("Procesando registro: " + id + " -> " + name);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
      lenguajeCodigo: "Java"
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
    class MessageBroker {
        <<interface>>
        +publish(topic: String, message: String)
        +register(node: Node)
    }
    class ClusterMessageBroker {
        -nodes: List~Node~
        +publish(topic: String, message: String)
        +register(node: Node)
    }
    class Node {
        <<abstract>>
        -broker: MessageBroker
        +send(topic: String, msg: String)
        +receive(msg: String)
    }
    MessageBroker <|.. ClusterMessageBroker
    Node --> MessageBroker
    ClusterMessageBroker o-- Node`,
    components: [
      { clase: "Mediator (Interfaz Mediador)", responsabilidad: "Declara los métodos de comunicación con los componentes, usualmente un único método notify() o publish()." },
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
    javaCode: `// Ejemplo Realista: Broker de Mensajes Distribuido (Kafka/RabbitMQ Simplificado)
import java.util.ArrayList;
import java.util.List;

public interface MessageBroker {
    void register(ServiceNode node);
    void send(String topic, String msg, ServiceNode sender);
}

public abstract class ServiceNode {
    protected final MessageBroker broker;
    protected final String serviceName;

    public ServiceNode(MessageBroker broker, String serviceName) {
        this.broker = broker;
        this.serviceName = serviceName;
    }

    public abstract void receive(String msg);
}

public class OrderServiceNode extends ServiceNode {
    public OrderServiceNode(MessageBroker broker) {
        super(broker, "OrderService");
    }

    public void createOrder(String orderId) {
        System.out.println("[OrderService] Pedido creado: " + orderId);
        broker.send("ORDERS", "NUEVO_PEDIDO:" + orderId, this);
    }

    @Override
    public void receive(String msg) {
        System.out.println("[OrderService] Evento recibido: " + msg);
    }
}

public class InventoryServiceNode extends ServiceNode {
    public InventoryServiceNode(MessageBroker broker) {
        super(broker, "InventoryService");
    }

    @Override
    public void receive(String msg) {
        System.out.println("[InventoryService] Ajustando stock debido a: " + msg);
    }
}

public class ClusterMessageBroker implements MessageBroker {
    private final List<ServiceNode> nodes = new ArrayList<>();

    @Override
    public void register(ServiceNode node) {
        nodes.add(node);
    }

    @Override
    public void send(String topic, String msg, ServiceNode sender) {
        System.out.println("[Broker] Ruteando evento del canal: " + topic);
        for (ServiceNode node : nodes) {
            if (node != sender) {
                node.receive(msg);
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MessageBroker broker = new ClusterMessageBroker();
        OrderServiceNode orders = new OrderServiceNode(broker);
        InventoryServiceNode inventory = new InventoryServiceNode(broker);

        broker.register(orders);
        broker.register(inventory);

        orders.createOrder("1001-A");
    }
}`,
    flow: `sequenceDiagram
    participant Orders as OrderServiceNode
    participant Broker as ClusterBroker
    participant Inventory as InventoryServiceNode

    Orders->>Broker: send("ORDERS", "NUEVO_PEDIDO:1001-A", this)
    Broker->>Inventory: receive("NUEVO_PEDIDO:1001-A")
    Note over Inventory: Ajustar stock`,
    realCase: {
      descripcion: "Centraliza la lógica de mensajería asíncrona entre microservicios autónomos. En lugar de que el Microservicio A conozca las URLs REST del Microservicio B, C y D, todos envían eventos a un Broker centralizado de Kafka/RabbitMQ.",
      ejemplos: [
        "CORPAC (Aeropuerto Jorge Chávez): La torre de control actúa como mediador entre todos los aviones despegando y aterrizando.",
        "Cámara de Compensación Electrónica (CCE): Actúa como mediador en las transferencias interbancarias entre bancos (BCP, Interbank, BBVA).",
        "Yape a Plin: El switch transaccional que media entre los ecosistemas de ambos bancos."
      ],
      codigoResolucion: `// Configuración de un ruteador Kafka Producer como Mediador en Spring Boot
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderEventMediator {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public OrderEventMediator(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    // EXPOSICIÓN: Explica cómo la Cámara de Compensación Electrónica (CCE) peruana evita que cada banco tenga que conectarse a los demás uno por uno.
    // Centraliza la mensajería, desacoplando los servicios emisores de los receptores
    public void notifyOrderCreated(String orderId) {
        String eventPayload = "{ \\"orderId\\": \\"" + orderId + "\\", \\"status\\": \\"CREATED\\" }";
        
        // Ruteador envía el mensaje a la cola centralizada
        kafkaTemplate.send("orders-topic", orderId, eventPayload);
        System.out.println("[Mediator] Evento de Orden publicado en Kafka Topic.");
    }
}`,
      lenguajeCodigo: "Java"
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
    class FileSnapshot {
        -content: String
        +getContent() String
    }
    class GitWorkspace {
        -content: String
        +save() FileSnapshot
        +restore(fs: FileSnapshot)
    }
    class GitHistory {
        -history: Stack
        +commit(gw: GitWorkspace)
        +checkout()
    }
    GitWorkspace ..> FileSnapshot
    GitHistory o-- FileSnapshot`,
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
    javaCode: `// Ejemplo Realista: Control de Versiones Git Local (Workspace & Commits)
import java.util.Stack;

public final class FileSnapshot {
    private final String content;

    public FileSnapshot(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}

public class GitWorkspace {
    private String contentFile;

    public void setContentFile(String contentFile) {
        this.contentFile = contentFile;
    }

    public String getContentFile() {
        return contentFile;
    }

    public FileSnapshot commit() {
        return new FileSnapshot(contentFile);
    }

    public void checkout(FileSnapshot snapshot) {
        if (snapshot != null) {
            this.contentFile = snapshot.getContent();
        }
    }
}

public class GitHistory {
    private final Stack<FileSnapshot> commits = new Stack<>();
    private final GitWorkspace workspace;

    public GitHistory(GitWorkspace workspace) {
        this.workspace = workspace;
    }

    public void saveCommit() {
        System.out.println("[GitHistory] Guardando Commit en repositorio local...");
        commits.push(workspace.commit());
    }

    public void checkoutLastCommit() {
        if (!commits.isEmpty()) {
            System.out.println("[GitHistory] Restaurando última versión del código...");
            workspace.checkout(commits.pop());
        } else {
            System.out.println("[GitHistory] No hay commits disponibles para restaurar.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        GitWorkspace workspace = new GitWorkspace();
        GitHistory history = new GitHistory(workspace);

        workspace.setContentFile("v1: public class App {}");
        history.saveCommit();

        workspace.setContentFile("v2: public class App { public void run() {} }");
        System.out.println("Estado actual del archivo: " + workspace.getContentFile());

        history.checkoutLastCommit();
        System.out.println("Estado restaurado del archivo: " + workspace.getContentFile());
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Workspace as GitWorkspace
    participant History as GitHistory
    participant Commit as FileSnapshot

    Cliente->>Workspace: setContent("v1")
    Cliente->>History: saveCommit()
    History->>Workspace: commit()
    create participant Commit
    Workspace->>Commit: new FileSnapshot("v1")
    Workspace-->>History: Snapshot
    History->>History: Guardar en pila
    Cliente->>History: checkoutLastCommit()
    History->>Workspace: checkout(Snapshot)
    Workspace->>Commit: getContent()
    Commit-->>Workspace: "v1"`,
    realCase: {
      descripcion: "En sistemas interactivos de frontend, Memento permite registrar instantáneas previas de variables de estado complejas para habilitar atajos como deshacer o volver a la última versión antes de un fallo inesperado del sistema.",
      ejemplos: [
        "SUNARP: Guardar el estado de un borrador de constitución de empresa antes de firmarlo, para poder restaurarlo si la sesión expira.",
        "Migraciones: Al llenar el formulario de pasaporte, guardar mementos del avance para evitar perder los datos si falla el pago de Págalo.pe.",
        "Sistemas de transacciones bancarias para realizar Rollback si el cajero GlobalNet falla."
      ],
      codigoResolucion: `// Custom React Hook en TypeScript para deshacer estados complejos (Memento)
import { useState } from "react";

export function useHistoryState<T>(initialValue: T) {
  const [state, setState] = useState<T>(initialValue);
  const [mementos, setMementos] = useState<T[]>([]); // Historial de recuerdos

  const updateState = (newValue: T) => {
    setMementos((prev) => [...prev, state]); // Guarda snapshot previo (Memento)
    setState(newValue);
  };

  // EXPOSICIÓN: Enfatiza que gracias a esto, un usuario en SUNARP no pierde su progreso de horas si se corta el internet.
  const undo = () => {
    if (mementos.length === 0) return;
    const previous = mementos[mementos.length - 1];
    setMementos((prev) => prev.slice(0, -1));
    setState(previous); // Restaura el estado previo
  };

  return [state, updateState, undo] as const;
}`,
      lenguajeCodigo: "TypeScript"
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
    class ServiceEventBus {
        -subscribers: List
        +subscribe(o: EventSubscriber)
        +publish(event: String)
    }
    class EventSubscriber {
        <<interface>>
        +onEvent(event: String)
    }
    class EmailService {
        +onEvent(event: String)
    }
    ServiceEventBus --> EventSubscriber
    EventSubscriber <|.. EmailService`,
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
    javaCode: `// Ejemplo Realista: Bus de Eventos Reactivo en Microservicios
import java.util.ArrayList;
import java.util.List;

public interface EventListener {
    void onEvent(String eventType, String payload);
}

public class MicroserviceEventBus {
    private final List<EventListener> listeners = new ArrayList<>();

    public void register(EventListener listener) {
        listeners.add(listener);
    }

    public void emit(String eventType, String payload) {
        System.out.println("[EventBus] Evento emitido: " + eventType + " -> notifying subscribers...");
        for (EventListener listener : listeners) {
            listener.onEvent(eventType, payload);
        }
    }
}

public class EmailNotificationService implements EventListener {
    @Override
    public void onEvent(String eventType, String payload) {
        if ("ORDER_CREATED".equals(eventType)) {
            System.out.println("[EmailService] Enviando correo de confirmación para el pedido: " + payload);
        }
    }
}

public class LogisticsService implements EventListener {
    @Override
    public void onEvent(String eventType, String payload) {
        if ("ORDER_CREATED".equals(eventType)) {
            System.out.println("[LogisticsService] Preparando empaquetado para envío de: " + payload);
        }
    }
}

public class Main {
    public static void main(String[] args) {
        MicroserviceEventBus bus = new MicroserviceEventBus();
        bus.register(new EmailNotificationService());
        bus.register(new LogisticsService());

        // Emitir un evento
        bus.emit("ORDER_CREATED", "Orden #8992-Laptop");
    }
}`,
    flow: `sequenceDiagram
    participant Bus as EventBus
    participant Email as EmailService
    participant Logistics as LogisticsService

    Bus->>Email: onEvent("ORDER_CREATED", "Orden #8992")
    Bus->>Logistics: onEvent("ORDER_CREATED", "Orden #8992")`,
    realCase: {
      descripcion: "Utilizado para suscribir callbacks a eventos del ciclo de vida del DOM o flujos de streaming asíncronos de datos de red, evitando el consumo ineficiente de recursos de polling.",
      ejemplos: [
        "SISMATE (Indeci) / IGP: Suscripción de celulares a nivel nacional para recibir alertas de sismo.",
        "Yape / Interbank App: Notificaciones Push automáticas (Observadores) cuando recibes un depósito (Sujeto).",
        "El Comercio / Gestión: Suscriptores que reciben correos automáticamente con noticias de última hora."
      ],
      codigoResolucion: `// Registro de EventListener (Observer) nativo en un Servidor Node.js
const EventEmitter = require('events');
const orderEmitter = new EventEmitter();

// EXPOSICIÓN: Compara esto con cómo tu celular (Observador) recibe el SMS de SISMATE cuando el IGP (Sujeto) detecta un sismo.
// Observador 1: Registrar Logs
orderEmitter.on('order_placed', (orderId) => {
  console.log(\`[Logger] Pedido \${orderId} registrado en auditoría.\`);
});

// Observador 2: Enviar Correo
orderEmitter.on('order_placed', (orderId) => {
  console.log(\`[Mailer] Correo de compra enviado para \${orderId}.\`);
});

// Sujeto emite el cambio
orderEmitter.emit('order_placed', '99827-A');`,
      lenguajeCodigo: "JavaScript"
    }
  },
  {
    id: "state",
    name: "State",
    englishName: "Estado",
    concept: {
      definicion: "Permite a un objeto alterar su comportamiento cuando su estado interno cambia. El objeto parecerá cambiar de clase.",
      ideaCentral: "Extraer los comportamientos específicos de cada estado a clases independientes que implementan una interfaz común, y delegar el trabajo al estado activo de forma polimórfica.",
      problema: "Cuando una clase tiene una máquina de estados compleja (como un pedido de compras con estados: Pendiente, Pagado, Enviado, Cancelado), su código se llena de condicionales gigantescos (if-else o switch) que validan el estado antes de cada acción. Añadir un nuevo estado requiere alterar todos los métodos de la clase.",
      cuandoUsar: [
        "Cuando tengas un objeto que se comporta de forma diferente dependiendo de su estado actual, el número de estados sea enorme y el código del estado cambie con frecuencia.",
        "Cuando tengas una clase contaminada con condiciones masivas que gobiernan cómo se comporta la clase de acuerdo con los valores actuales de los campos de la clase."
      ],
      analogia: "El botón de bloqueo de un smartphone: Si la pantalla está apagada, pulsar el botón enciende la pantalla (Estado Apagado). Si la pantalla está encendida pero bloqueada, pulsar el botón apaga la pantalla (Estado Bloqueado). Si la pantalla está desbloqueada y en uso, pulsar el botón bloquea y apaga el teléfono (Estado Activo)."
    },
    uml: `classDiagram
    class OrderState {
        <<interface>>
        +pay(order: Order)
        +ship(order: Order)
    }
    class CreatedState {
        +pay(order: Order)
        +ship(order: Order)
    }
    class PaidState {
        +pay(order: Order)
        +ship(order: Order)
    }
    class Order {
        -state: OrderState
        +setState(state: OrderState)
        +processPayment()
        +shipOrder()
    }
    Order --> OrderState
    OrderState <|.. CreatedState
    OrderState <|.. PaidState`,
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
    javaCode: `// Ejemplo Realista: Ciclo de vida de una Orden de E-Commerce (Creada -> Pagada -> Enviada)
public interface OrderState {
    void processPayment(OrderContext order);
    void shipOrder(OrderContext order);
}

public class CreatedState implements OrderState {
    @Override
    public void processPayment(OrderContext order) {
        System.out.println("[State: Created] Pago procesado correctamente de forma electrónica.");
        order.setState(new PaidState());
    }

    @Override
    public void shipOrder(OrderContext order) {
        System.out.println("[State: Created] Error: No se puede enviar un pedido sin pagar.");
    }
}

public class PaidState implements OrderState {
    @Override
    public void processPayment(OrderContext order) {
        System.out.println("[State: Paid] Error: El pedido ya fue pagado.");
    }

    @Override
    public void shipOrder(OrderContext order) {
        System.out.println("[State: Paid] Despachando pedido de almacén...");
        order.setState(new ShippedState());
    }
}

public class ShippedState implements OrderState {
    @Override
    public void processPayment(OrderContext order) {
        System.out.println("[State: Shipped] Error: Pedido ya pagado y despachado.");
    }

    @Override
    public void shipOrder(OrderContext order) {
        System.out.println("[State: Shipped] Error: El pedido ya está en ruta de entrega.");
    }
}

public class OrderContext {
    private OrderState currentState;

    public OrderContext() {
        this.currentState = new CreatedState();
    }

    public void setState(OrderState state) {
        this.currentState = state;
    }

    public void executePayment() {
        currentState.processPayment(this);
    }

    public void executeShipping() {
        currentState.shipOrder(this);
    }
}

public class Main {
    public static void main(String[] args) {
        OrderContext pedido = new OrderContext();
        
        System.out.println("--- Intento de envío inicial ---");
        pedido.executeShipping();

        System.out.println("\\n--- Procesando pago ---");
        pedido.executePayment();

        System.out.println("\\n--- Intentando enviar ahora ---");
        pedido.executeShipping();
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Context as OrderContext
    participant Created as CreatedState
    participant Paid as PaidState

    Cliente->>Context: executePayment()
    Context->>Created: processPayment(this)
    Created->>Context: setState(PaidState)
    Note over Context: Estado actualiza a PaidState`,
    realCase: {
      descripcion: "Utilizado en la automatización de flujos de aprobación complejos de documentos y de compras donde la lógica de validación difiere radicalmente según la fase activa del objeto.",
      ejemplos: [
        "Tambo Delivery / Falabella: Seguimiento de pedido (Recibido -> Preparando -> En camino -> Entregado).",
        "Cajeros GlobalNet o BCP: La máquina de estados cambia según si la tarjeta está insertada, el PIN es válido o falta saldo.",
        "Procesos judiciales en el Poder Judicial del Perú: Expediente (Mesa de Partes -> Juzgado -> Apelación -> Sentencia)."
      ],
      codigoResolucion: `// Implementación de Máquina de Estados usando Spring StateMachine en Java
import org.springframework.statemachine.StateMachine;
import org.springframework.statemachine.config.StateMachineBuilder;

public class SpringStateMachineConfig {
    public StateMachine<String, String> buildMachine() throws Exception {
        StateMachineBuilder.Builder<String, String> builder = StateMachineBuilder.builder();

        // EXPOSICIÓN: Usa el ejemplo de Falabella: si el estado es \'EN_CAMINO\', el cliente ya no puede cancelar el pedido mágicamente.
        // 1. Configurar Estados
        builder.configureStates()
            .withStates()
            .initial("CREATED")
            .state("PAID")
            .state("SHIPPED");

        // 2. Configurar Transiciones y disparadores (Events)
        builder.configureTransitions()
            .withExternal()
            .source("CREATED").target("PAID").event("PROCESS_PAYMENT")
            .and()
            .withExternal()
            .source("PAID").target("SHIPPED").event("SHIP");

        return builder.build();
    }
}`,
      lenguajeCodigo: "Java"
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
    class TaxStrategy {
        <<interface>>
        +calculateTax(amount: double) double
    }
    class USTaxCalculation {
        +calculateTax(amount: double) double
    }
    class EUTaxCalculation {
        +calculateTax(amount: double) double
    }
    class TaxCalculatorContext {
        -strategy: TaxStrategy
        +setStrategy(strategy: TaxStrategy)
        +calculate(amount: double) double
    }
    TaxCalculatorContext --> TaxStrategy
    TaxStrategy <|.. USTaxCalculation
    TaxStrategy <|.. EUTaxCalculation`,
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
    javaCode: `// Ejemplo Realista: Calculadora de Impuestos Internacionales en Facturación
public interface TaxStrategy {
    double calculateTax(double amount);
}

// Estrategia 1: Impuestos Estados Unidos
public class USTaxCalculation implements TaxStrategy {
    @Override
    public double calculateTax(double amount) {
        return amount * 0.08; // 8% tax rate
    }
}

// Estrategia 2: Impuestos Unión Europea (VAT)
public class EUTaxCalculation implements TaxStrategy {
    @Override
    public double calculateTax(double amount) {
        return amount * 0.20; // 20% VAT rate
    }
}

// Contexto
public class InvoiceCalculator {
    private TaxStrategy taxStrategy;

    public void setTaxStrategy(TaxStrategy taxStrategy) {
        this.taxStrategy = taxStrategy;
    }

    public double calculateTotalInvoice(double netAmount) {
        if (taxStrategy == null) {
            throw new IllegalStateException("Estrategia de impuestos no seleccionada.");
        }
        double tax = taxStrategy.calculateTax(netAmount);
        return netAmount + tax;
    }
}

public class Main {
    public static void main(String[] args) {
        InvoiceCalculator calculator = new InvoiceCalculator();

        // Calcular factura para cliente en Estados Unidos
        calculator.setTaxStrategy(new USTaxCalculation());
        double totalUS = calculator.calculateTotalInvoice(100.0);
        System.out.println("Total factura (US): $" + totalUS);

        // Calcular factura para cliente en Unión Europea
        calculator.setTaxStrategy(new EUTaxCalculation());
        double totalEU = calculator.calculateTotalInvoice(100.0);
        System.out.println("Total factura (EU): $" + totalEU);
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Context as InvoiceCalculator
    participant Strategy as USTaxCalculation

    Cliente->>Context: setPaymentStrategy(USTaxCalculation)
    Cliente->>Context: calculateTotalInvoice(100)
    Context->>Strategy: calculateTax(100)
    Strategy-->>Context: 8.00
    Context-->>Cliente: 108.00`,
    realCase: {
      descripcion: "Permite estructurar pasarelas de facturación globales donde el cálculo de retenciones o método de cobro varía según la geolocalización o el tipo de cliente sin alterar la clase del flujo de caja.",
      ejemplos: [
        "Pasarelas de Pago en Perú: Niubiz (Visa/MC), PagoEfectivo (Código), Yape/Plin (QR). El comercio elige la estrategia dinámica.",
        "Rutas de Lima / Waze en Lima: Estrategia de calcular ruta rápida evitando tráfico, peajes o zonas peligrosas.",
        "Cálculo de envíos por Olva Courier, Shalom o Serpost según el destino y peso del paquete."
      ],
      codigoResolucion: `// Ruteador dinámico de pasarelas de pago usando Strategy en Java con inyección de Spring
import org.springframework.stereotype.Service;
import java.util.Map;

public interface PaymentGateway {
    void process(double amount);
}

@Service
public class BillingProcessor {
    // Spring inyecta automáticamente todas las estrategias en un mapa con sus IDs
    private final Map<String, PaymentGateway> gateways;

    public BillingProcessor(Map<String, PaymentGateway> gateways) {
        this.gateways = gateways;
    }

    // EXPOSICIÓN: Explica cómo un E-commerce peruano inyecta PagoEfectivo, Yape o Niubiz dinámicamente sin llenar su código de "if-else".
    public void checkout(String gatewayType, double amount) {
        PaymentGateway strategy = gateways.get(gatewayType);
        if (strategy == null) {
            throw new IllegalArgumentException("Método de pago no disponible.");
        }
        strategy.process(amount); // Ejecuta la estrategia elegida dinámicamente
    }
}`,
      lenguajeCodigo: "Java"
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
    class DataETLProcessor {
        <<abstract>>
        +process()
        #readData()
        #transformData()
        #saveData()
    }
    class JSONETLProcessor {
        #readData()
        #transformData()
    }
    class CSVETLProcessor {
        #readData()
        #transformData()
    }
    DataETLProcessor <|-- JSONETLProcessor
    DataETLProcessor <|-- CSVETLProcessor`,
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
    javaCode: `// Ejemplo Realista: Pipeline ETL (Extract, Transform, Load) de Archivos
public abstract class ETLDataPipeline {
    // EXPOSICIÓN: Explica que aquí está el esqueleto inalterable, como el proceso de matrícula de la UNI que todos deben seguir.
    // Método Plantilla
    public final void runETL() {
        extract();
        transform();
        load();
    }

    protected abstract void extract();
    protected abstract void transform();

    protected void load() {
        System.out.println("[ETL Pipeline] Guardando datos unificados en Base de Datos de Producción.");
    }
}

public class CSVETLPipeline extends ETLDataPipeline {
    @Override
    protected void extract() {
        System.out.println("[CSV Pipeline] Extrayendo líneas y separando campos por comas del archivo CSV...");
    }

    @Override
    protected void transform() {
        System.out.println("[CSV Pipeline] Limpiando correos y estandarizando números telefónicos...");
    }
}

public class JSONETLPipeline extends ETLDataPipeline {
    @Override
    protected void extract() {
        System.out.println("[JSON Pipeline] Parseando objetos de texto estructurado del archivo JSON...");
    }

    @Override
    protected void transform() {
        System.out.println("[JSON Pipeline] Convirtiendo tipos de variables según esquema...");
    }
}

public class Main {
    public static void main(String[] args) {
        System.out.println("--- Iniciando proceso ETL de Ventas (CSV) ---");
        ETLDataPipeline csvJob = new CSVETLPipeline();
        csvJob.runETL();

        System.out.println("\\n--- Iniciando proceso ETL de Clientes (JSON) ---");
        ETLDataPipeline jsonJob = new JSONETLPipeline();
        jsonJob.runETL();
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Pipeline as CSVETLPipeline

    Cliente->>Pipeline: runETL()
    Pipeline->>Pipeline: extract()
    Pipeline->>Pipeline: transform()
    Pipeline->>Pipeline: load() (base class implementation)`,
    realCase: {
      descripcion: "El patrón de método plantilla es la base estructural del ciclo de consultas en base de datos de librerías como JDBC (JdbcTemplate). El framework prepara la conexión y libera recursos, y tú inyectas sólo la query.",
      ejemplos: [
        "UNI / San Marcos: Proceso de matrícula de alumnos (el esqueleto es el mismo, pero el cálculo de pago o validación de cursos varía por facultad).",
        "SUNAT: Proceso de declaración jurada, donde los pasos son iguales pero varían las deducciones para Renta de 4ta vs 5ta.",
        "React Component Lifecycle: Métodos como componentDidMount() son ganchos (hooks)."
      ],
      codigoResolucion: `// Implementación típica del patrón en el framework Spring (JdbcTemplate Query)
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

public class UserRowMapperRepository {
    private final JdbcTemplate jdbcTemplate;

    public UserRowMapperRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void printUserNames() {
        // JdbcTemplate maneja abrir conexión, preparar statement, manejar errores y cerrar conexión (Template Method)
        // EXPOSICIÓN: Explica que aquí está el esqueleto inalterable, como el proceso de matrícula de la UNI que todos deben seguir.
        // El cliente solo define el mapeo del registro concreto (Concrete step callback)
        jdbcTemplate.query("SELECT id, username FROM users", (rs, rowNum) -> {
            System.out.println("Usuario mapeado: " + rs.getString("username"));
            return null;
        });
    }
}`,
      lenguajeCodigo: "Java"
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
    class ASTNode {
        <<interface>>
        +accept(v: Visitor)
    }
    class ClassNode {
        +accept(v: Visitor)
        +getClassName() String
    }
    class ASTVisitor {
        <<interface>>
        +visit(c: ClassNode)
    }
    class LinterVisitor {
        +visit(c: ClassNode)
    }
    ASTNode <|.. ClassNode
    ASTVisitor <|.. LinterVisitor`,
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
    javaCode: `// Ejemplo Realista: Linter/Validador de Código en un Compilador (Nodos AST)
public interface ASTNode {
    void accept(ASTVisitor visitor);
}

public class ClassNode implements ASTNode {
    private final String className;

    public ClassNode(String className) {
        this.className = className;
    }

    public String getClassName() { return className; }

    @Override
    public void accept(ASTVisitor visitor) {
        visitor.visitClass(this);
    }
}

public interface ASTVisitor {
    void visitClass(ClassNode node);
}

// EXPOSICIÓN: Haz la analogía con los inspectores de SUNAT visitando empresas sin cambiar el rubro de las mismas.
// Analizador Linter de Reglas de Nomenclatura
public class NamingConventionLinter implements ASTVisitor {
    @Override
    public void visitClass(ClassNode node) {
        System.out.println("[Linter] Analizando nomenclatura de la clase: " + node.getClassName());
        char firstChar = node.getClassName().charAt(0);
        if (!Character.isUpperCase(firstChar)) {
            System.out.println("[Warning] Nombre inválido: " + node.getClassName() + " debe empezar con mayúscula.");
        } else {
            System.out.println("[Linter] Clase correcta.");
        }
    }
}

public class Main {
    public static void main(String[] args) {
        ASTNode[] nodes = new ASTNode[] {
            new ClassNode("UsuarioService"),
            new ClassNode("servicioFacturacion")
        };

        ASTVisitor linter = new NamingConventionLinter();
        for (ASTNode node : nodes) {
            node.accept(linter);
        }
    }
}`,
    flow: `sequenceDiagram
    participant Cliente
    participant Element as ClassNode
    participant Visitor as NamingLinter

    Cliente->>Element: accept(linter)
    Element->>Visitor: visitClass(this)
    Note over Visitor: Valida Mayúscula
    Visitor-->>Element: void
    Element-->>Cliente: void`,
    realCase: {
      descripcion: "El compilador e intérprete de Javascript (Babel) recorre el árbol sintáctico abstracto (AST) de tu código usando un objeto Visitor para realizar transpilación de ES6 a ES5 o análisis de linters.",
      ejemplos: [
        "Auditores de SUNAT: Visitan diferentes tipos de empresas (MYPE, Régimen General) y ejecutan diferentes estrategias de auditoría sin cambiar el código de la empresa.",
        "Inspectores de INDECI: Visitan locales comerciales para verificar aforos y rutas de escape según el tipo de local.",
        "Sistemas de exportación de documentos de la ONPE."
      ],
      codigoResolucion: `// Implementación de un plugin de Babel usando un Visitor en JavaScript
module.exports = function (babel) {
  const { types: t } = babel;
  return {
    name: "replace-identifiers-visitor",
    visitor: {
      // Babel ejecuta esta función al visitar cada nodo Identifier del árbol AST
      Identifier(path) {
        if (path.node.name === "nombresAntiguos") {
          path.node.name = "nombresNuevos"; // Transpila el nodo AST
        }
      }
    }
  };
};`,
      lenguajeCodigo: "JavaScript"
    }
  }
];
