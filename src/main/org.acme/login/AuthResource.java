package org.acme.login;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.io.InputStream;
import java.net.URI;
import io.vertx.ext.web.RoutingContext;

@Path("/") // 기본경로가최상위/
public class AuthResource {

    @Inject
    RoutingContext context;   // Quarkus Vert.x 세션 접근

    // GET /after_login → 로그인HTML 페이지반환
    @GET
    @Path("/after_login")
    @Produces(MediaType.TEXT_HTML)
    public Response afterLogin() {
        // 세션 체크: 로그인 안 한 사용자 차단
        String loginUser = context.session().get("loginUser");
        // 세션 내용 로그 출력
        System.out.println("=== 세션 ID : " + context.session().id());
        System.out.println("=== loginUser : " + loginUser);
        if (loginUser == null) {
            // 세션 없음 → 로그인 페이지로강제이동
            return Response.seeOther(URI.create("/login")).build();
        }

        // 세션 있음 → 로그인 후 HTML 반환
        InputStream html = getClass()
                .getClassLoader()
                .getResourceAsStream("META-INF/resources/login/main_after_login.html");
        return Response.ok(html).build();
    }

    @POST // 아이디, 패스워드 전송받음
    @Path("/login_check")
    @Transactional
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response loginCheck(
            @FormParam("username") String username,
            @FormParam("password") String password) {
        User user = User.findByUsername(username); // 아이디 조회
        if (user == null) {
            return Response.seeOther(URI.create("/login?error=1")).build();
        }
        // 세션에 로그인 정보 저장
        context.session().put("loginUser", username);
        return Response.seeOther(URI.create("/after_login")).build();
    }

    @GET
    @Path("/logout")
    public Response logout() {
        // 로그아웃 전 세션 정보출력
        System.out.println("=== 로그아웃 전 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 전 loginUser : " + context.session().get("loginUser"));
        // 세션 전체 삭제
        context.session().destroy();
        // 로그아웃 후 세션 정보출력
        System.out.println("=== 로그아웃 후 세션 ID : " + context.session().id());
        System.out.println("=== 로그아웃 후 loginUser : " + context.session().get("loginUser"));
        return Response.seeOther(URI.create("/")).build();
    }

    // AuthResource.java 아래새로추가
@GET
@Path("/register")
@Produces(MediaType.TEXT_HTML)
public Response registerPage() {
InputStream html = getClass()
.getClassLoader()
.getResourceAsStream(
"META-INF/resources/login/register.html");
return Response.ok(html).build();
}
}

