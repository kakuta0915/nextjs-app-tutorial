import Link from "next/link";
import { useRouter } from "next/router";
import styles from '../../styles/Home.module.css';

// SSGの場合 paramsにはURLの情報が含まれている
// export async function getStaticProps({params}) {

//     // fetch(取得) dataをjsonから取りに行く
//     const req = await fetch(`http://localhost:3000/${params.id}.json`);
//     const data = await req.json(); //リクエスト内容をjson形式にする

//     return {
//         props: {
//             product: data,
//         },
//     };
// }

// //pathsの指定
// export async function getStaticPaths() {
//     const req = await fetch(`http://localhost:3000/products.json`);
//     const data = await req.json(); //リクエスト内容をjson形式にする

//     const paths = data.map((product) => {
//         return {
//             params: {
//                 id: product,
//             },
//         };
//     });

//     return {
//         paths,
//         fallback: false, //パスで設定されていないものは404と表示する指定
//     }
// }

// サーバーサイドレンダリング(ユーザーがリクエストしたときにレンダリング)
export async function getServerSideProps({params}) {

    // fetch(取得) dataをjsonから取りに行く
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json(); //リクエスト内容をjson形式にする

    return {
        props: {
            product: data
        },
    };
}

const Product = ({ product }) => {
    const router = useRouter();
    const { id } = router.query; //今のURLのオブジェクトのIDを取得できる

    // console.log(router.query.id);

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1>{id}のページです</h1>
                <img src={product.image} width="300" height="400" />
                <p>{product.name}</p>
                <br />
                <Link href="/products">
                    商品一覧へ
                </Link>
            </main>
        </div>
    );
}

export default Product;