const dotenv = require("dotenv").config();
var Dropbox = require("dropbox").Dropbox;
var dbx = new Dropbox({
    accessToken:
        "sl.u.AFhZwRGnL8LE01yoo0qfAMPN3QGXKg4adsficAn2LeMf2RPximTJBtYmc_TIBQtK8820k0a7xAYYYdLB93PObC2RZxh_IxSdHMEezupB47VOfx7mMxsQvW5mr_gEkBKYGCM5gwdSX0FXpPXoCqBAdFemSWQkku-7nWZdoEfSw3GoV3vkbgrppd01m3z3t92TO48r8x65YbRm36fxiS6xml87AeNyhkKe6DfRVFEnFafsfo2kd4C86uz9X6GnQN_A8Jd0LSMpbQoylsOsdZEfHX_RSvnGL1lia1s8436Z-PmTzA8BMKxPd5JVSom08RBXQGHPJriV2BnLCbiIwWwXiAdjfaM_X7qZ9wuIEL-BOtDZgGs2-uHPiJXnZuN_O_-L0ZM-N3PQF5USRpVScyKRUOPU8z2DWbJ8wwk74E9_KK2lXagZ4R7ree86zuDQMQo8N5c82QrYgvNEMRJKHUBllUCE6YJ2gFn8-zD3NZ-7gVXecSIeI35h--0vpgIhu1uZSioWaUNFO1zbhKdyz5av-SqJp44twVaVFVE9JQoLFVDBxNDhynZCal9tLIXcnfE-pWY9xbHLI_npixYmqKUMAKHNzbsl68q_CLPalpZ4peQMkhhOZcBi5PhW6Jg40OIqTUBWIl_TgMMz54gX0WxcIaqDIlvFcxcfoxY_0syC1lBV0SzUJNPx_pA8wd2u0_jx8hIaPYxmN7-zHtCkshXVUVozg9yyVq2HJ7oPyHGRpBJf-z9a68xMt-UEpC6CepM4gY99_i06tX_ZS-DEk6hM0600VoBWKbWHMqeZnVihN4gSo7CgMoFKlou4MLHZoqtabk2aUAqPAIMk3AhfPuk0ryXIKOd0IXS83EefYz7N8icmIVo29NZSqACkVbGEwkDq-l0fRRB054eFrt_NEOIycJnjFJgUYkOg29n2ZR47LwDgTWwOZjuSgb-HIJdjbvEbaK8lx7aOB0IPN2ANSwqO5VrpHBlddTdC0WOvPc8XNbEHF43HrY3sIf2P7NkIXRjpowMnA2_7c-E_q1aFrPjfxGFfRo0DZoQiSY2J_5O02SX8UmgDQPtGa9PjQL1THht1vSeEENdUkUjYcJIeFN00ackpp8HbayclOt9fe8Vaz8Jqfm0AA3Chdukp-z91GQGjcID1dDWqPKo_0aaei8TkBOeZDRDWOCPM7bTvVg7NIYYM6styRbdvZAMQAbQcxKgd6NWnzjCPg1L6Nz-mrpZ2pqWtsXmhRo4mYqccrceK7yye5HqmiveCLjQwlXre9c0-lOuFpayHBJGpJ6Co8dVh-fsN",
});

async function getDropboxImages(folderPath = "") {
    try {
        const response = await dbx.filesListFolder({ path: folderPath });

        const imageFiles = response.entries.filter((file) =>
            file.name.match(/\.(jpg|jpeg|png|gif)$/i)
        );

        const imageLinks = await Promise.all(
            imageFiles.map(async (file) => {
                const linkResponse = await dbx.filesGetTemporaryLink({
                    path: file.path_lower,
                });
                return { name: file.name, link: linkResponse.link };
            })
        );

        console.log("DROPBOX CONNECTED");
        return imageLinks; // Array of { name, link }
    } catch (error) {
        console.error("Error fetching images from Dropbox:", error);
        throw error;
    }
}
const cafeImages = getDropboxImages("/images");
module.exports = getDropboxImages;
