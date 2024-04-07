1.
"`package-lock.json`" est un fichier contenant les numéros de version exacte des dépendances d'un projet. Il permet de verrouiller les versions des dépendances d'un projet. Il permet donc de garantir que toutes les versions des dépendances installées sont les mêmes pour tout le monde.

2.
Le format des numéros de version à 3 chiffres est appelé "Semantic Versioning". 

| Statut du code                            | Étape        | Règle                                         | Exemple de version |
|-------------------------------------------|--------------|-----------------------------------------------|--------------------|
| Première publication                      | Nouveau produit | Commencer par `1.0.0`                        | `1.0.0`              |
| Corrections de bugs rétrocompatibles | Version du correctif| Incrémenter le troisième chiffre          | `1.0.1`              |
| Nouvelles fonctionnalités rétrocompatibles | Version mineure | Incrémenter le chiffre du milieu et réinitialiser le dernier chiffre à zéro | `1.1.0`              |
| Changements qui rompent la compatibilité ascendante | Version majeure | Incrémenter le premier chiffre et réinitialiser les chiffres du milieu et du dernier à zéro | `2.0.0`              |

3.
Une `devDependency` est une dépendance utilisée pour le développement. Ca peut être des outils de test, formatage, minification... Elles ne sont pas nécessaires pour l'exécution de l'application en production.

4.
Une `iife` est une fonction qui est déclarée et appelée immédiatement. Elle est utilisée pour créer un scope isolé pour les variables. Les variables déclarées dans une `iife` ne sont pas accessibles en dehors de la fonction. 
Les modules ES6 ont remplacé les `iife`. Avec les modules ES6, on peut importer et exporter des fonctions, variables, classes pour gérer les scopes facilement.

5.
`import * as toto from './utils'` importe tous les exports de `./utils` dans un namespace `toto`, elles peuvent ensuite être utilisées en les appelant `toto.nom`. Cela permet d'éviter les collisions tout en important toutes les exports. `import { parseUrl } from './utils'` importe uniquement l'export nommé `parseUrl`.
L'utilisation de l'un ou l'autre dépend du besoin, importer uniquement les parties utiles permet de gagner en clarté et en optimisation. Importer tout peut être utile si on a besoin de toutes ou énormément de fonctions de ce module.

6.
Avec les classes Java, on peut créer des classes abstraites et des interfaces.

7.
Les variables déclarées avec `var` sont globales. La portée des déclarations `var` n'est pas limitée aux blocs.
`let` est limité à la portée du bloc dans lequel il est déclaré. Les variables `let` ne sont pas accessibles en dehors du bloc dans lequel elles sont déclarées. `let` a une portée dite "normale" comme les autres langages de programmation.

8.
`.bind(this)` permet de donner le contexte à la fonction. Cela peut, par exemple, permettre d'utiliser le `this` d'une classe dans une fonction non fléchée déclarée dans une méthode. Si on supprime `.bind(this)`, le `this` de la fonction sera `undefined` et donc on ne pourra pas accéder aux propriétés de la classe. Avec les fonctions fléchées, le contexte est automatiquement conservé, donc `.bind(this)` n'est pas nécessaire. On peut donc utiliser le `this` de la classe dans une fonction fléchée.

9.
Le `@` est utilisé pour indiquer que le package est un paquet de portée (scoped packages). Les scopes sont un moyen de regrouper des paquets apparentés. Chaque utilisateur/organisation npm a son propre scope, et vous seul pouvez ajouter des paquets dans votre scope. Cela permet de ne pas avoir à s'inquiéter que quelqu'un d'autre prenne le nom de votre paquet avant vous.
C'est donc aussi un bon moyen de signaler les paquets officiels pour les organisations.

10.
Les Promesses permettent de gérer plus facilement les opérations asynchrones grâce à une syntaxe plus claire et en évitant les "callbacks hell".

11.
ECMAScript 2017 (ES8) a introduit `async/await`.

12.
La programmation orientée composant pour le web est considérée comme plus maintenable car elle permet de découper l'application en composants réutilisables. Chaque composant est indépendant et peut être testé séparément. Cela permet de bien séparer les responsabilités et de rendre le code plus lisible et plus facile à maintenir. Si un composant ne fonctionne pas correctement, on sait que le problème vient de ce composant et on peut le corriger sans affecter les autres composants.
C'est aussi un très bon moyen pour réutiliser du code et gagner du temps.
Exemple : quelqu'un a déjà fait un composant toaster, on peut l'importer et l'utiliser dans notre application sans avoir à le recréer et se soucier de son bon fonctionnement.

13.
La programmation fonctionnelle est un paradigme de programmation de type déclaratif. Elle se base sur l'utilisation de fonctions pures, c'est-à-dire des fonctions qui renvoient toujours le même résultat pour les mêmes paramètres.
La programmation fonctionnelle permet de réduire les effets de bord et de rendre le code plus lisible et plus facile à maintenir. Elle permet aussi de gérer plus facilement les opérations asynchrones grâce à des fonctions comme `map`, `filter`, `reduce`...

14.
La fonction `map()` est utilisée pour transformer chaque élément d'un tableau en un autre élément en appliquant une fonction de transformation à chacun des éléments puis renvoie un nouveau tableau contenant les éléments transformés.
Exemple :
```javascript
const res = [1, 2, 3].map(num => num * 10);
console.log(res); // [10, 20, 30]
```

15.
La fonction `filter()` est utilisée pour filtrer les éléments d'un tableau en fonction d'une condition donnée. Elle renvoie un nouveau tableau contenant uniquement les éléments pour lesquels la condition est vraie.
Exemple :
```javascript
const res = [1, 2, 3, 4].filter(num => num > 2);
console.log(res); // [3, 4]
```

16.
La fonction `reduce()` est utilisée pour réduire un tableau à une seule valeur en appliquant une fonction accumulateur à chaque élément du tableau. Par exemple, renvoie la somme de tous les éléments d'un tableau, avec une fonction accumulateur qui ajoute chaque élément au total.
Exemple :
```javascript
const res = [1, 2, 3].reduce((acc, num) => acc + num, 0);
console.log(res); // 6
```

17.
`.then()` est une méthode utilisée pour chaîner des actions à exécuter après la résolution d'une promesse, cela permet de faire de la programmation fonctionnelle. Alors que `async/await` est une syntaxe qui simplifie la gestion des promesses en permettant d'écrire du code asynchrone dans un style de code synchrone "normale".

18.
Par convention, le préfixe `_` est utilisé pour indiquer que le fichier est un fichier partiel. Les fichiers partiels sont des fichiers qui ne sont pas compilés directement en CSS, mais qui sont inclus dans d'autres fichiers Sass à l'aide de la directive `@import`.
