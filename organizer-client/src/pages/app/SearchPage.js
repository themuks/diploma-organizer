import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useTranslation } from "react-i18next";
import UserService from "../../services/user.service";
import { useSearchParams } from "react-router-dom";
import SearchList from "../../components/search/SearchList";

const SearchPage = () => {
    const { t, i18n } = useTranslation();
    const [entities, setEntities] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("query");
        UserService.search(query).then(response => {
            setEntities(prev => response.data);
        });
    }, [searchParams]);

    return (<>
        <div className="flex w-full gap-4 flex-wrap">
            <Card>
                <div className="flex flex-col gap-4">
                    <SearchList results={entities}/>
                </div>
            </Card>
        </div>
    </>);
};

export default SearchPage;