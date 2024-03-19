import React from "react";
import { useGetUsersQuery } from "../../redux/features/auth/authApi";

export default function Dashboard() {
  const { data, isError, isLoading, isSuccess } = useGetUsersQuery(undefined);
  console.log("get user rtk ==>", { data, isError, isLoading, isSuccess });
  return (
    <div
    // style={{
    //   width: "1028px",
    //   overflow: "scroll",
    // }}
    >
      <h1>Dashboard</h1>
      <p>This is dashboard</p>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odio itaque
        nostrum facilis sequi voluptas placeat illo reprehenderit neque autem
        maxime sit assumenda animi quo obcaecati mollitia, aperiam harum
        consequatur quod rerum praesentium consequuntur fugiat. Nisi pariatur,
        magnam voluptate voluptatum eaque impedit, neque provident aspernatur
        quis vero consectetur animi, ratione repellat aut vitae doloremque
        quibusdam reiciendis tempora? Corrupti explicabo minima ullam aperiam
        ducimus in ratione veritatis, delectus tempora unde nostrum esse vitae
        repellat? Suscipit sequi aliquid numquam dicta sunt recusandae harum
        similique velit nihil adipisci dolores ab, ad atque dolore omnis
        mollitia, tempora ipsum quia. Minus, maxime? Illo error odio iure, fuga
        alias minima quis at rerum. Aliquid deserunt nobis sit vero in adipisci,
        distinctio accusamus necessitatibus minus sed modi tenetur quia hic
        perspiciatis provident illum iusto consectetur eveniet ratione! Magni
        unde harum consequuntur at odit voluptate excepturi placeat quos! Amet
        vero quidem, odio ipsam quam a fugiat ut impedit iste maxime eos. Fugiat
        fugit maxime doloribus nulla. Sint rem ipsum at ratione sapiente
        excepturi non qui voluptatum, ab animi natus asperiores vel expedita
        suscipit magni itaque obcaecati autem aliquam repellendus? At, debitis
        odit esse praesentium voluptate eum molestiae eius numquam voluptas ad
        culpa est sunt maxime fugit officia vel in iusto quod consectetur qui,
        distinctio quis! Unde, ipsum in fugiat accusantium omnis quod repellat
        hic nemo enim, eius, corrupti exercitationem voluptate distinctio
        deleniti autem quidem maiores quas obcaecati est ex minima nesciunt
        dolore beatae odio. Placeat impedit recusandae culpa, distinctio quidem
        consequatur sit laborum ex id? Suscipit voluptate quaerat officiis
        laudantium aliquam iure eum et impedit sapiente, numquam a, libero velit
        corrupti, accusamus reiciendis itaque inventore ex quis. Ratione
        corporis voluptate, labore ut inventore eaque modi ea tenetur atque
        minus laboriosam? Cum aliquam atque consectetur laudantium, incidunt
        laborum error aspernatur reprehenderit consequuntur cupiditate id, rerum
        nobis nesciunt repellendus dolor ipsa a repudiandae nam eaque. Laborum
        sed eius nobis voluptatum facilis delectus quos! Itaque molestiae
        consequatur in possimus? Sapiente voluptatum animi natus at atque quasi
        libero in repudiandae quidem incidunt voluptate nesciunt eius sit optio,
        eos doloribus minus? Vero mollitia blanditiis libero qui officiis
        deleniti totam quibusdam. Dolore quia quae accusantium laudantium id
        cumque mollitia aspernatur vel nam quidem esse quam perferendis eius
        corporis maiores totam omnis eligendi ad quod necessitatibus, itaque ab
        sed odit laboriosam! Maxime dolorum sapiente nobis quibusdam cumque
        nisi. Quasi modi beatae facere laudantium quod corporis iure, a vitae
        aut rerum architecto consectetur! Doloribus incidunt omnis dolorum sit,
        expedita deleniti saepe. Earum nesciunt, mollitia fugiat est pariatur,
        fugit excepturi ad iste sunt soluta, unde sit ratione libero placeat.
        Maiores magnam ipsum, odit, laudantium architecto maxime quis
        perferendis inventore adipisci optio, ut ea soluta doloremque debitis
        eligendi. Ratione autem, magnam, similique consequatur velit distinctio
        quibusdam, aut alias nulla debitis eum. Quos cupiditate cum rerum
        officiis deleniti. Perspiciatis culpa quasi nobis architecto deserunt
        doloremque esse dolorem quis, quisquam cumque expedita assumenda
        molestias neque aliquid? Tempora totam vel atque recusandae libero
        incidunt facilis quia tenetur assumenda placeat fugit esse, fuga odit
        sunt commodi beatae minima nisi repellendus nihil, ab dolorum
        consequuntur tempore voluptatem! Magnam, iste suscipit! Deleniti fugiat,
        numquam tempore quo odio minima explicabo! Facere qui vitae cumque, nemo
        enim facilis odio, voluptates et repellendus quaerat minima dignissimos
        asperiores. Veniam maiores nam earum minima quasi, itaque aspernatur
        repudiandae ipsum fuga ut sint rem aut eum saepe dolorem dolore placeat
        blanditiis ea cupiditate debitis mollitia. Optio neque rerum asperiores,
        dolores iusto, provident ea eius maiores sint nobis beatae quasi.
        Expedita, eius consectetur voluptate consequuntur eos velit aliquam in
        voluptas atque a, vel commodi voluptatum officia, perferendis sequi.
        Quod beatae a quis consequatur architecto nobis ea facilis, eveniet,
        nostrum itaque veritatis possimus adipisci distinctio, culpa nulla!
        Debitis nihil sit soluta rerum dolorum id blanditiis velit suscipit
        error quia accusamus similique eveniet incidunt ducimus iure consectetur
        pariatur, dicta repellat. Corporis dicta odit molestiae ratione, ipsam
        culpa similique? Debitis, numquam expedita. Incidunt tenetur expedita
        eveniet libero magnam saepe dignissimos iusto esse assumenda nobis
        quibusdam atque, asperiores eius corrupti temporibus beatae veniam
        dolore modi animi perferendis aut. Ea ipsam eum temporibus vel tenetur
        eligendi minus dolorum numquam cumque nulla! Doloribus voluptatum vitae
        commodi nam iure eligendi similique iusto esse dicta, ipsam veniam!
        Atque recusandae quo error! Voluptatibus et dicta blanditiis?
        Consequuntur iure quidem molestiae cupiditate repudiandae ducimus
        delectus qui, necessitatibus vel placeat ab dolores ipsa eveniet, vero a
        ratione? Rem quasi temporibus atque culpa iste, quas molestiae quisquam
        sint accusantium explicabo illum fugit laudantium odio ab similique amet
        harum omnis ex ipsam. Officiis rerum delectus doloribus doloremque quo,
        repellat impedit nesciunt qui recusandae mollitia error et atque debitis
        dignissimos illo saepe sit, beatae voluptatum tempora voluptate eos
        quod! Ipsa pariatur vero exercitationem cumque ducimus possimus delectus
        ad veritatis? Blanditiis molestiae assumenda laboriosam odio unde
        officiis sed libero illo dolores! Voluptate molestias ducimus fugiat
        voluptates necessitatibus repellendus quo esse optio id repellat totam
        obcaecati cum, at alias iure? Laudantium numquam, eos iste ut odit
        quaerat, architecto recusandae distinctio, tempore sequi aperiam minus?
        Voluptatibus, nulla! Esse distinctio facere sint reiciendis soluta
        accusamus consectetur facilis, deserunt aut asperiores perferendis, sit
        earum numquam quis laborum consequatur quibusdam aperiam veniam
        adipisci! Quas soluta, qui vel maiores delectus deleniti? Magni
        laboriosam eius, incidunt laudantium esse quas possimus, recusandae
        suscipit distinctio ipsum neque perferendis soluta id corrupti? Autem
        vero quibusdam eius ea nemo eum deleniti adipisci et ipsa vitae ullam
        error nesciunt obcaecati repudiandae magni veritatis explicabo alias
        iusto praesentium porro tenetur, ad blanditiis. Eligendi veniam
        asperiores voluptate voluptatem velit excepturi quidem magnam non
        officia iusto tempore, amet, reiciendis dolore eveniet a architecto
        perspiciatis officiis cupiditate voluptatibus sint consequuntur
        nesciunt. Quam iure nostrum deserunt ratione aut officia eveniet
        temporibus, quaerat omnis dolores reiciendis numquam assumenda ipsam
        odio, quisquam facilis. Quae eaque ullam dolores ipsum tempora. Eius
        harum dolorum ad quos perspiciatis repellat omnis dolor quis dicta at
        assumenda officia dolores sint maxime libero illo amet consectetur,
        deleniti iusto optio itaque. Harum nulla maiores quod incidunt esse
        officiis ab sequi quo tempore repellendus, explicabo asperiores fugit
        deleniti, voluptas impedit reiciendis fuga provident voluptatem!
        Dolores, deserunt. Quaerat eos voluptatum cum. Tempora rem aspernatur
        vero.
      </p>
    </div>
  );
}
